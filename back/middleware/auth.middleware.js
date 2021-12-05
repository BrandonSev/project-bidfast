const jwt = require("jsonwebtoken");
const db = require("../database");
/**
 * Permet de vérifier si un utilisateur est connecté
 * Si oui, renvoie dans la requete les informations de l'utilisateur connecté
 * Si non , renvoie null
 * @param req
 * @param res
 * @param next
 */
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        db.query(
          "SELECT * FROM users WHERE id=?",
          [decodedToken.id],
          function (err, result) {
            if (err) return res.status(400).send();
            res.locals.user = result[0];
            next();
          }
        );
      }
    });
  } else {
    res.locals.user = null;
    req.user = null;
    next();
  }
};
/**
 * Permet seulement de vérifier si un utilisateur est connecté
 * Si non renvoie une 403
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
module.exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) return res.send(err);
      next();
    });
  } else {
    return res
      .status(403)
      .json({ message: "Vous devez être connecté pour continuer" });
  }
};
/**
 * Permet de vérifier si l'utilisateur a les droits Admin
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
module.exports.isAdmin = async (req, res, next) => {
  if (res.locals.user.roles !== "ADMIN")
    return res
      .status(401)
      .json({ messsage: "Vous n'avez pas les droits requis" });
  next();
};
/**
 * Permet de vérifier si l'utilisateur a les droits admin ou si l'utilisateur connecté correspond a l'id de la requete
 * Si non retourne une 401
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
module.exports.onlyOwnerOrAdmin = async (req, res, next) => {
  if (
    parseInt(req.params.id) === res.locals.user.id ||
    res.locals.user.roles === "ADMIN"
  ) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Vous n'avez pas les droits requis" });
  }
};
/**
 * Permet de vérifier qu'un utilisateur n'est pas connecté
 * Si oui redirection vers '/'
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.onlyVisitor = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) return res.send(err);
      return res.redirect("/");
    });
  } else {
    next();
  }
};

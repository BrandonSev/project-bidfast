const db = require("../../database");
const fs = require("fs");
const path = require("path");

/**
 * Middleware qui permet de vérifier la taille d'un fichier envoyé
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.checkFileSize = (req, res, next) => {
  if (req.files && req.files[0].size > 300000) {
    return res
      .status(413)
      .json({ message: "Votre fichier ne doit pas dépasser 300ko" });
  }
  next();
};
/**
 * Middleware qui permet de vérifier la requète lors d'une mise a jour d'un compte utilisteur
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
module.exports.update = async (req, res, next) => {
  const { firstname, lastname, roles, genre } = req.body;
  let userInformation = {};
  let previousAvatar = "";
  if (!firstname && !lastname && !roles && !genre && !req.files) {
    return res
      .status(400)
      .json({ message: "Compléter les champs obligatoires" });
  }
  if (firstname) {
    userInformation.firstname = firstname;
  }
  if (lastname) {
    userInformation.lastname = lastname;
  }
  if (roles) {
    userInformation.roles = roles;
  }
  if (genre) {
    userInformation.genre = genre;
  }
  if (req.files && req.files[0].filename) {
    userInformation.avatar = req.files[0].filename;
    await db
      .promise()
      .query("SELECT avatar from users WHERE id = ?", [req.params.id])
      .then((result) => {
        if (result[0][0].avatar !== null) previousAvatar = result[0][0].avatar;
      })
      .then(() => {
        if (previousAvatar) {
          fs.unlink(
            path.join(__dirname, `../../../public/${previousAvatar}`),
            (err) => {
              if (err) console.log(err);
            }
          );
        }
      });
  }
  req.userInformations = userInformation;
  next();
};

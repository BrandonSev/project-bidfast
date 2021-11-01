const db = require('../database')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;
// Function qui permet de génerer un token jwt
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};


// Fonction qui permet de créer un compte
module.exports.signUp = async (req, res) => {
  const saltRounds = 10;
  let {email, firstname, lastname, password, genre, age} = req.body;
  password = await bcrypt.hash(password, saltRounds);
  db.query('INSERT INTO users SET email=?, firstname=?, lastname=?, password=?, genre=?, age=?', [email, firstname, lastname, password, genre, age], function (err, result) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY")
        return res.status(400).json({message: "Cet email est déjà pris."})
      return res.send(err)
    }
    return res.status(201).json({message: "Bravo, votre compte a bien été créer"})
  })
};
// Fonction qui permet de se connecter
module.exports.signIn = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) return res.status(400).send()
  db.query('SELECT * FROM users WHERE users.email = ?', [email], async function (err, result, fields) {
      if (err) return res.status(400).send(err)
      if (!result.length) return res.status(404).json({ message: "Cet email est introuvable"})
      const comparison = bcrypt.compare(password, result[0].password);
      if (comparison) {
        const token = createToken(result[0].id);
        res.cookie("jwt", token, {httpOnly: true, maxAge});
        res.status(200).json({
          message: "Bravo, vous êtes maintenant connecté!",
        });
      } else {
        return res.status(400).json({message: "Mot de passe incorrect, veuillez réessayer"})
      }
      return res.status(200).json({
        message: "Bravo, vous êtes maintenant connecté!",
      });
    }
  )
};

// Fonction qui permet de se déconnecter
module.exports.signOut = (req, res) => {
  if (req.cookies.jwt) {
    return res
      .clearCookie("jwt")
      .status(200)
      .json({message: "Vous êtes maintenant déconnecté"});
  }
  return res.status(400).json({message: "Vous n'êtes actuellement pas connecté"})
}
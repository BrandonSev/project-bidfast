const db = require('../database')
const bcrypt = require("bcrypt");

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
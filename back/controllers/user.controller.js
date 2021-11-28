const db = require('../database')
const fs = require("fs");
const path = require("path");

module.exports.findAllUsers = (req, res) => {
  db.query('SELECT u.id, u.firstname, u.lastname, u.email, u.avatar, u.genre, u.age FROM users AS u ORDER BY u.email ASC', function (err, result, fields) {
    if (err) return res.status(400).send(err)
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  })
}
module.exports.findOne = (req, res) => {
  db.query('SELECT u.id, u.firstname, u.lastname, u.email, u.avatar, u.genre, u.age FROM users AS u WHERE u.id = ?', [req.params.id], function (err, result) {
    if (err) return res.status(400).send(err)
    if (!result.length) return res.status(404).send()
    return res.status(200).send(result)
  })
}
module.exports.removeUser = (req, res) => {
  db.query('DELETE FROM users WHERE users.id = ?', [req.params.id], function (err, result) {
    if (err) return res.status(400).send()
    if (result.affectedRows === 0) return res.status(404).send()
    if (parseInt(req.params.id) === res.locals.user.id) res.cookie('jwt', '', {maxAge: 1})
    return res.status(200).json({message: "Le compte a bien été supprimé"})
  })
}
module.exports.update = (req, res) => {
  const userId = req.params.id || res.locals.user.id
  const {firstname, lastname, roles, genre} = req.body
  if (!firstname && !lastname && !roles && !genre && !req.files) {
    return res.status(400).json({message: 'Vous devez entrer toutes les informations nécessaires'})
  }
  let sql = 'UPDATE users SET ? WHERE id=?';
  let userInformation = {}
  if (firstname) {
    userInformation.firstname = firstname
  }
  if (lastname) {
    userInformation.lastname = lastname
  }
  if (roles) {
    userInformation.roles = roles
  }
  if (req.files && req.files[0].filename) {
    db.query('SELECT avatar from users WHERE id = ?', [userId], function (err, result) {
      if (err) return res.status(400).send(err)
      if (result.affectedRows === 0) return res.status(404).send()
      userInformation.previousAvatar = result[0].avatar
    })
    userInformation.avatar = req.files[0].filename
  }
  if (genre) {
    userInformation.genre = genre
  }
  db.query(sql, [userInformation, userId], function (err, result) {
    if (err) return res.status(400).send(err)
    if (result.affectedRows === 0) return res.status(404).send()
    if (req.files) {
      fs.unlink(path.join(__dirname, `../../public/${userInformation.previousAvatar}`), err => {
        if (err) return console.log(err)
      })
    }
  })
  return res.status(200).json({message: 'Votre profile a bien été mise à jour', data: userInformation})
}
module.exports.findOffer = (req, res) => {
  let sql = 'SELECT * from offers WHERE userId=?';
  if (req.query.order) sql += ` ORDER BY createdAt ${req.query.order}`
  db.query(sql, [req.params.id], function (err, result) {
    if (err) return res.status(400).send()
    res.status(200).send(result)
  })
}
module.exports.findOfferBidding = (req, res) => {
  db.query('SELECT * from offer_bidding JOIN offers ON offers.id=offer_bidding.offerId WHERE offer_bidding.userId = ? ORDER BY offer_bidding.price ASC, offer_bidding.createdAt DESC', [req.params.id], function (err, result) {
    if (err) return res.status(400).send()
    res.status(200).send(result)
  })
}
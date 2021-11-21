const db = require('../database')

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
  const userId = req.params.id
  const {firstname, lastname, roles} = req.body
  db.query('UPDATE users AS u SET u.firstname = ?, u.lastname = ?, u.roles = ? WHERE u.id = ?', [firstname, lastname, roles, userId], function (err, result) {
    if (err) return res.status(400).send(err)
    if (result.affectedRows === 0) return res.status(404).send()
    res.status(200).json({message: 'Votre profile a bien été mise à jour'})
  })
}
module.exports.findOffer = (req, res) => {
  let sql = 'SELECT * from offers WHERE userId=?';
  if(req.query.order) sql += ` ORDER BY createdAt ${req.query.order}`
  db.query(sql, [req.params.id], function (err, result) {
    if(err) return res.status(400).send()
    res.status(200).send(result)
  })
}
module.exports.findOfferBidding = (req, res) => {
  db.query('SELECT * from offer_bidding JOIN offers ON offers.id=offer_bidding.offerId WHERE offer_bidding.userId = ? ORDER BY offer_bidding.price ASC, offer_bidding.createdAt DESC', [req.params.id], function (err, result) {
    if(err) return res.status(400).send()
    res.status(200).send(result)
  })
}
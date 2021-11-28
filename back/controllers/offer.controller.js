const db = require('../database')

module.exports.getAll = (req, res) => {
  db.query('SELECT * FROM offers', function (err, result) {
    if (err) return res.status(400).send(err)
    return res.status(200).send(result)
  })
}
module.exports.findOne = (req, res) => {
  db.query('SELECT * FROM offers WHERE id=?', [req.params.id], function (err, result) {
    if (err) return res.status(400).send(err)
    if (!result.length) return res.status(404).send()
    return res.status(200).send(result)
  })
}
module.exports.offerCreate = (req, res) => {
  const {name, content, image, expireAt, startPrice} = req.body
  const userId = res.locals.user.id || req.body.userId
  db.query('INSERT INTO offers SET name=?, content=?, image=?, expireAt=?, startPrice=?, userId=?, createdAt=?, updatedAt=?',
    [name, content, image || req.files[0].filename, expireAt, startPrice, userId, new Date(), new Date()], function (err, result) {
      if (err) return res.status(400).send(err)
      res.status(201).json({message: 'Votre offre a bien été créer'})
    })
}
module.exports.findOfferBidding = (req, res) => {
  let sql = 'SELECT * FROM offer_bidding WHERE offerId=?';
  if (req.query.order) sql += ` ORDER BY price ${req.query.order}`
  if (req.query.limit) sql += ` LIMIT ${req.query.limit}`
  db.query(sql, [req.params.id], function (err, result) {
    if (err) return res.status(400).send(err)
    if (!result.length) return res.status(404).send()
    return res.status(200).send(result)
  })
}
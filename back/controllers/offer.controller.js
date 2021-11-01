const db = require('../database')

module.exports.getAll = async (req, res) => {
  db.query('SELECT * FROM offers', function (err, result) {
    if (err) return res.status(400).send(err)
    return res.status(200).send(result)
  })
}

module.exports.offerCreate = async (req, res) => {
  const {name, content, image, expireAt, startPrice} = req.body
  const userId = res.locals.user.id
  db.query('INSERT INTO offers SET name=?, content=?, image=?, expireAt=?, startPrice=?, userId=?, createdAt=?, updatedAt=?',
    [name, content, image, expireAt, startPrice, userId, new Date(), new Date()], function (err, result) {
      if (err) return res.status(400).send(err)
      res.status(201).send()
    })
}
const db = require("../database")

module.exports.create = (req, res) => {
  const {price, offerId} = req.body
  if(!price) return res.status(400).send()
  db.query('SELECT o.id FROM offers AS o WHERE o.id=?', [offerId], function (err, result) {
    if (err) return res.status(400).send(err)
    if (result.length <= 0) return res.status(404).json({message: "Offre introuvable"})
    db.query('INSERT INTO offer_bidding SET price=?, userId=?, offerId=?', [price, res.locals.user.id, offerId], function (err, result) {
      if (err) {
        if (err.code === "ER_NO_REFERENCED_ROW_2")
          return res.status(404).send()
        return  res.status(400).send()
      }
      return res.status(201).json({ message: "Votre offre a bien été ajoutée"})
    })
  })
}
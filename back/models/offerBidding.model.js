const db = require("../database");

/**
 * Place une enchère sur une annonce selon l'id
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]|*>}
 */
module.exports.create = async (req, res) => {
  const {price, offerId} = req.body
  if (!price && !offerId) return res.status(400).send()
  return db.promise().query('SELECT o.id FROM offers AS o WHERE o.id=?', [offerId]).then(result => {
    if (result[0].length <= 0) return res.status(404).json({message: "Offre introuvable"})
    return db.promise().query('INSERT INTO offer_bidding SET price=?, userId=?, offerId=?', [price, res.locals.user.id, offerId])
      .then(res => {
        return res
      })
  })
}
/**
 * Recupere une enchere selon l'id d'une offre
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findById = async (req, res) => {
  const id = req.params.id
  return db.promise().query('SELECT * FROM offer_bidding WHERE id=?', [id]).then(result => {
    if (!result[0].length) return res.status(404).send()
    return result
  })
}
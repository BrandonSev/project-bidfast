const db = require("../database");

/**
 * Recupere tout les utilisateurs
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findAll = () => {
  return db
    .promise()
    .query(
      "SELECT u.id, u.firstname, u.lastname, u.email, u.avatar, u.genre, u.age FROM users AS u ORDER BY u.email ASC"
    );
};
/**
 * Recupere un utilisateur par son ID
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findById = (userId) => {
  return db
    .promise()
    .query(
      "SELECT u.id, u.firstname, u.lastname, u.email, u.avatar, u.genre, u.age FROM users AS u WHERE u.id = ?",
      [userId]
    );
};
/**
 * Supprime un utilisateur par son ID
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.removeById = (userId) => {
  return db.promise().query("DELETE FROM users WHERE users.id = ?", [userId]);
};
/**
 * Met à jour le profil d'un utilisateur par son ID
 * @returns {Promise<string|[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]|*>}
 */
module.exports.updateById = async (userInformation, userId) => {
  return db
    .promise()
    .query("UPDATE users set ? WHERE id=?", [userInformation, userId]);
};
/**
 * Recupere toutes les annonce publié par un utilisateur depuis son ID
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findOffersForUser = async (req, res) => {
  let sql = "SELECT * from offers WHERE userId=?";
  if (req.query.order) sql += ` ORDER BY expireAt ${req.query.order}`;
  return db
    .promise()
    .query(sql, [req.params.id])
    .then((result) => {
      if (!result[0].length) return res.status(404).send();
      return result;
    });
};
/**
 * Recupere toutes les enchere que l'utilisteur a fait
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findOffersBiddingsForUser = async (req, res) => {
  return db
    .promise()
    .query(
      "SELECT * from offer_bidding JOIN offers ON offers.id=offer_bidding.offerId WHERE offer_bidding.userId = ? ORDER BY offer_bidding.price ASC, offer_bidding.createdAt DESC",
      [req.params.id]
    )
    .then((result) => {
      if (!result[0].length) return res.status(404).send();
      return result;
    });
};

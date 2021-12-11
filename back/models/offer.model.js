const db = require("../database");
/**
 * Recupere toutes les annonces
 * @param [req]
 * @param [res]
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findAll = (req, res) => {
  let sql = "SELECT * FROM offers";
  if (req.query.expire) {
    if (req.query.expire === "false") {
      sql += ` WHERE expireAt > NOW()`;
    }
    if (req.query.expire === "true") {
      sql += ` WHERE expireAt < NOW()`;
    }
  }
  if (req.query.limit) sql += ` LIMIT ${req.query.limit}`;
  return db.promise().query(sql);
};
/**
 * Recupere une annonce par son ID
 * @param [req]
 * @param [res]
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findById = (req, res) => {
  return db
    .promise()
    .query("SELECT * FROM offers WHERE id=?", [req.params.id])
    .then((result) => {
      if (!result[0].length)
        return res
          .status(404)
          .json({ message: "Annonce introuvable, veuillez réesayer" });
      return result;
    });
};
/**
 * Créer une annonce
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>|*}
 */
module.exports.create = (req, res) => {
  const { name, content, image, expireAt, startPrice } = req.body;
  if (!name && !content && !image && !expireAt && !startPrice)
    return res.status(400).json({ message: "Tout les champs sont requis" });
  const userId = res.locals.user.id;
  return db
    .promise()
    .query(
      "INSERT INTO offers SET name=?, content=?, image=?, expireAt=?, startPrice=?, userId=?, createdAt=?, updatedAt=?",
      [
        name,
        content,
        image || req.files[0].filename,
        expireAt,
        startPrice,
        userId,
        new Date(),
        new Date(),
      ]
    );
};
/**
 * Recupere toutes les enchère depuis une offre
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findOffersBiddings = (req, res) => {
  let sql = "SELECT * FROM offer_bidding WHERE offerId=?";
  if (req.query.order) sql += ` ORDER BY price ${req.query.order}`;
  if (req.query.limit) sql += ` LIMIT ${req.query.limit}`;
  return db
    .promise()
    .query(sql, [req.params.id])
    .then((result) => {
      if (!result[0].length) return res.status(404).send();
      return result;
    });
};

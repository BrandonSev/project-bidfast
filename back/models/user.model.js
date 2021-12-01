const db = require("../database");
const fs = require("fs");
const path = require("path");

/**
 * Recupere tout les utilisateurs
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findAll = (res) => {
  return db.promise().query('SELECT u.id, u.firstname, u.lastname, u.email, u.avatar, u.genre, u.age FROM users AS u ORDER BY u.email ASC')
    .then(result => {
      if (!result[0].length) return res.status(204).send()
      return result
    })
}
/**
 * Recupere un utilisateur par son ID
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findById = (req, res) => {
  return db.promise().query('SELECT u.id, u.firstname, u.lastname, u.email, u.avatar, u.genre, u.age FROM users AS u WHERE u.id = ?', [req.params.id])
    .then(result => {
      if (!result[0].length) return res.status(404).send()
      return result
    })
}
/**
 * Supprime un utilisateur par son ID
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.removeById = (req, res) => {
  return db.promise().query('DELETE FROM users WHERE users.id = ?', [req.params.id])
    .then(result => {
      if (result[0].affectedRows === 0) return res.status(404).send()
      if (parseInt(req.params.id) === res.locals.user.id) res.cookie('jwt', '', {maxAge: 1})
      return result
    })
}
/**
 * Met à jour le profil d'un utilisateur par son ID
 * @param req
 * @param res
 * @returns {Promise<string|[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]|*>}
 */
module.exports.updateById = async (req, res) => {
  const {firstname, lastname, roles, genre} = req.body
  let userInformation = {}
  let previousAvatar = ''
  let message = ''
  let sql = 'UPDATE users SET ? WHERE id=?';
  if (!firstname && !lastname && !roles && !genre && !req.files) {
    message = 'Vous devez entrer toutes les informations nécessaires'
    return message
  }
  if (firstname) {
    userInformation.firstname = firstname
  }
  if (lastname) {
    userInformation.lastname = lastname
  }
  if (roles) {
    userInformation.roles = roles
  }
  if (genre) {
    userInformation.genre = genre
  }
  if (req.files && req.files[0].filename) {
    if (req.files[0].size > 300000) return res.status(413).json({message: 'Votre fichier ne doit pas dépasser 300ko'})
    try {
      userInformation.avatar = req.files[0].filename
      await db.promise().query('SELECT avatar from users WHERE id = ?', [req.params.id])
        .then(result => {
          if (result[0][0].avatar !== null) previousAvatar = result[0][0].avatar
        }).then(() => {
          if (previousAvatar) {
            fs.unlink(path.join(__dirname, `../../public/${previousAvatar}`), err => {
              if (err) console.log(err)
            })
          }
          return db.promise().query(sql, [userInformation, req.params.id])
        })
    } catch (err) {
      return res.status(400).send(err)
    }
  }
  return db.promise().query(sql, [userInformation, req.params.id])
}
/**
 * Recupere toutes les annonce publié par un utilisateur depuis son ID
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findOffersForUser = async (req, res) => {
  let sql = 'SELECT * from offers WHERE userId=?';
  if (req.query.order) sql += ` ORDER BY createdAt ${req.query.order}`
  return db.promise().query(sql, [req.params.id]).then(result => {
    if (!result[0].length) return res.status(404).send()
    return result
  })
}
/**
 * Recupere toutes les enchere que l'utilisteur a fait
 * @param req
 * @param res
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 */
module.exports.findOffersBiddingsForUser = async (req, res) => {
  return db.promise().query('SELECT * from offer_bidding JOIN offers ON offers.id=offer_bidding.offerId WHERE offer_bidding.userId = ? ORDER BY offer_bidding.price ASC, offer_bidding.createdAt DESC', [req.params.id])
    .then(result => {
      if (!result[0].length) return res.status(404).send()
      return result
    })
}
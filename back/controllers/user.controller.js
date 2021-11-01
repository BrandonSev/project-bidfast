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
    if (parseInt(req.params.id) === res.locals.user[0].id) res.cookie('jwt', '', {maxAge: 1})
    res.status(200).json({message: "Le compte a bien été supprimé"})
  })
}
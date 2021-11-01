const db = require('../database')

module.exports.findAllUsers = (req, res) => {
  db.query('SELECT u.id, u.firstname, u.lastname, u.email, u.avatar, u.genre, u.age FROM users AS u ORDER BY u.email ASC', function (err, result, fields) {
    if (err) return res.status(400).send(err)
    if (!result) return res.status(204).send()
    return res.status(200).send(result)
  })
}
const User = require("../models/user.model");

module.exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(res)
    return res.json(users[0])
  } catch (err) {
    return res.status(400).send(err)
  }
}
module.exports.findOne = async (req, res) => {
  try {
    const user = await User.findById(req, res)
    return res.json(user[0])
  } catch (err) {
    return res.status(400).send(err)
  }
}
module.exports.removeUser = async (req, res) => {
  try {
    await User.removeById(req, res)
    return res.status(204).json({message: "Le compte a bien été supprimé"})
  } catch (err) {
    return res.status(400).send(err)
  }
}
module.exports.update = async (req, res) => {
  try {
    await User.updateById(req, res)
    const user = await User.findById(req, res)
    return res.status(200).json({message: 'Votre profile a bien été mise à jour', data: user[0]})
  } catch (err) {
    console.log(err)
  }
}
module.exports.findOffer = async (req, res) => {
  try {
    const offer = await User.findOffersForUser(req)
    return res.status(200).send(offer[0])
  } catch (err) {
    return res.status(400).send()
  }
}
module.exports.findOfferBidding = async (req, res) => {
  try {
    const offersBiddings = await User.findOffersBiddingsForUser(req, res)
    return res.status(200).send(offersBiddings[0])
  } catch (err) {
    return res.status(400).send()
  }
}
const User = require("../models/user.model");

module.exports.findAllUsers = async (req, res) => {
  try {
    const [users] = await User.findAll();
    if (!users.length) return res.send(204).send();
    return res.json(users);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.findOne = async (req, res) => {
  try {
    const [user] = await User.findById(req.params.id);
    if (!user.length) return res.status(404).send();
    return res.json(user);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.removeUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const [user] = await User.removeById(userId);
    if (!user.affectedRows) return res.status(404).send();
    return res.status(204).json({ message: "Le compte a bien été supprimé" });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.update = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    await User.updateById(req.userInformations, userId);
    const [user] = await User.findById(req.params.id);
    return res
      .status(200)
      .json({ message: "Votre profile a bien été mise à jour", data: user });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.findOffer = async (req, res) => {
  try {
    const offer = await User.findOffersForUser(req);
    return res.status(200).send(offer[0]);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.findOfferBidding = async (req, res) => {
  try {
    const offersBiddings = await User.findOffersBiddingsForUser(req, res);
    return res.status(200).send(offersBiddings[0]);
  } catch (err) {
    return res.status(400).send(err);
  }
};

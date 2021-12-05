const Offer = require("../models/offer.model");

module.exports.getAll = async (req, res) => {
  try {
    const offers = await Offer.findAll(req);
    return res.status(200).send(offers[0]);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.findOne = async (req, res) => {
  try {
    const offer = await Offer.findById(req, res);
    return res.status(200).send(offer[0]);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.offerCreate = async (req, res) => {
  try {
    await Offer.create(req, res);
    res.status(201).json({ message: "Votre offre a bien été créer" });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.findOfferBidding = async (req, res) => {
  try {
    const offers = await Offer.findOffersBiddings(req, res);
    return res.status(200).send(offers[0]);
  } catch (err) {
    return res.status(400).send(err);
  }
};

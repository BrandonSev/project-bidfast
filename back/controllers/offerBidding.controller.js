const OfferBidding = require("../models/offerBidding.model");

module.exports.create = async (req, res) => {
  try {
    await OfferBidding.create(req, res);
    return res.status(201).json({ message: "Votre offre a bien été ajoutée" });
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.findOne = async (req, res) => {
  try {
    const offerBidding = await OfferBidding.findById(req, res);
    return res.status(200).json(offerBidding[0]);
  } catch (err) {
    return res.status(400).send(err);
  }
};

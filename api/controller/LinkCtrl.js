"use strict";

const LinkModel = require("../model/LinkModel");

require("dotenv").config();

/**
 * LIST LINK
 * @param {object} req 
 * @param {object} res 
 */
exports.list = (req, res) => {
  LinkModel
    .find()
    .then((links) => res.status(200).json(links))
    .catch((error) => res.status(400).json({ error }));
};

//! ****************************** CRUD ******************************

/**
 * CREATE LINK
 * @param {object} req 
 * @param {object} res 
 */
exports.create = (req, res) => {
  let link = new LinkModel(req.body);

  link
    .save()
    .then(() => res.status(201).json({ message: process.env.LINK_CREATED }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * UPDATE LINK
 * @param {object} req 
 * @param {object} res 
 */
exports.update = (req, res) => {
  let link = req.body;

  LinkModel
    .updateOne({ _id: req.params.id }, { ...link, _id: req.params.id })
    .then(() => res.status(200).json({ message: process.env.LINK_UPDATED }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * DELETE LINK
 * @param {object} req 
 * @param {object} res 
 */
exports.delete = (req, res) => {
  LinkModel
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: process.env.LINK_DELETED }))
    .catch((error) => res.status(400).json({ error }))
};

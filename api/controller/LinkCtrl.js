"use strict";

const formidable  = require("formidable");
const LinkModel   = require("../model/LinkModel");

require("dotenv").config();

const form = formidable();

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
 * @param {function} next 
 */
exports.create = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    let link = new LinkModel(fields);

    link
      .save()
      .then(() => res.status(201).json({ message: process.env.LINK_CREATED }))
      .catch((error) => res.status(400).json({ error }));
  })
};

/**
 * UPDATE LINK
 * @param {object} req 
 * @param {object} res 
 */
exports.update = (req, res) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    LinkModel
      .updateOne({ _id: req.params.id }, { ...fields, _id: req.params.id })
      .then(() => res.status(200).json({ message: process.env.LINK_UPDATED }))
      .catch((error) => res.status(400).json({ error }));
  })
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

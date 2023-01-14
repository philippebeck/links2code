"use strict";

const bcrypt      = require("bcrypt");
const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");
const accents     = require("remove-accents");
const UserModel   = require("../model/UserModel");

require("dotenv").config();

const form = formidable({ 
  uploadDir: process.env.IMG_URL, 
  keepExtensions: true 
});

/**
 * LIST USERS
 * @param {object} req 
 * @param {object} res 
 */
exports.list = (req, res) => {
  UserModel
    .find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
}

/**
 * LOGIN USER
 * @param {object} req 
 * @param {object} res 
 */
exports.login = (req, res) => {
  UserModel
    .findOne({ email: req.body.email })
    .then((user) => { nem.checkLogin(req.body.pass, user, res) })
    .catch((error) => res.status(500).json({ error }));
}

//! ****************************** CRUD ******************************

/**
 * CREATE USER
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

    let image = accents.remove(fields.name).toLowerCase() + "-" + Date.now() + "." + process.env.IMG_EXT;

    if (!nem.checkEmail(fields.email)) {
      return res.status(401).json({ message: process.env.USER_EMAIL });
    };

    if (!nem.checkPass(fields.pass)) {
      return res.status(401).json({ message: process.env.USER_PASS });
    }

    nem.createImage(files.image.newFilename, image);

    bcrypt
      .hash(fields.pass, 10)
      .then((hash) => {

        let user = new UserModel({
          name: fields.name,
          email: fields.email,
          image: image,
          pass: hash
        });

        fs.unlink(process.env.IMG_URL + files.image.newFilename, () => {
          user
            .save()
            .then(() => res.status(201).json({ message: process.env.USER_CREATED }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
}

/**
 * UPDATE USER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.update = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    if (!nem.checkEmail(fields.email)) {
      return res.status(401).json({ message: process.env.USER_EMAIL });
    };

    if (!nem.checkPass(fields.pass)) {
      return res.status(401).json({ message: process.env.USER_PASS });
    }

    let image = fields.image;

    if (Object.keys(files).length !== 0) {
      image = accents.remove(fields.name).toLowerCase() + "-" + Date.now() + "." + process.env.IMG_EXT;
      nem.createImage(files.image.newFilename, image);

      UserModel
        .findOne({ _id: req.params.id })
        .then((user) => 
          fs.unlink(process.env.IMG_URL + user.image, () => {
            fs.unlink(process.env.IMG_URL + files.image.newFilename, () => {
              console.log("Image ok !");
            })
          })
        )
    }

    bcrypt
      .hash(fields.pass, 10)
      .then((hash) => {
        let user = {
          name: fields.name,
          email: fields.email,
          image: image,
          pass: hash
        };

        UserModel
          .updateOne({ _id: req.params.id }, { ...user, _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.USER_UPDATED }))
      })
      .catch((error) => res.status(400).json({ error }));
  });
}

/**
 * DELETE USER
 * @param {object} req 
 * @param {object} res 
 */
exports.delete = (req, res) => {
  UserModel
    .findOne({ _id: req.params.id })
    .then(user => {
      fs.unlink(process.env.IMG_URL + user.image, () => {
        UserModel
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.USER_DELETED }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
}

//! ****************************** MAILER ******************************

/**
 * SEND USER MESSAGE
 * @param {object} req 
 * @param {object} res 
 */
exports.send = (req, res) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    const mailer  = nem.createMailer();

    (async function(){
      try {
        let mail = nem.createMessage(fields);

        await mailer.sendMail(mail, function() {
          res.status(200).json({ message: process.env.USER_MESSAGE });
        });

      } catch(e){ console.error(e); }
    })();
  })
}

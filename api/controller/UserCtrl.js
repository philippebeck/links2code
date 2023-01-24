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
 * LIST ALL USERS
 * @param {object} req 
 * @param {object} res 
 */
exports.listUsers = (req, res) => {
  UserModel
    .find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
}

/**
 * LOGIN USER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.loginUser = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    UserModel
      .findOne({ email: fields.email })
      .then((user) => { nem.checkLogin(fields.pass, user, res) })
      .catch((error) => res.status(500).json({ error }));
  })
}

/**
 * FORGOT PASSWORD
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.forgotPass = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    UserModel
      .findOne({ email: fields.email })
      .then((user) => { 
        let pass    = nem.generatePass();
        fields.text = fields.text + pass;

        bcrypt
          .hash(pass, 10)
          .then((hash) => {
            let newUser = {
              name: user.name,
              email: user.email,
              image: user.image,
              pass: hash
            };

            UserModel
              .updateOne({ _id: user._id }, { ...newUser, _id: user._id })
              .then(() => {
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
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  })
}

/**
 * CHECK USER CREDENTIALS
 * @param {string} email 
 * @param {string} pass 
 * @param {object} res 
 */
exports.checkCredentials = (email, pass, res) => {
  if (!nem.checkEmail(email)) {
    return res.status(401).json({ message: process.env.USER_EMAIL });
  }

  if (!nem.checkPass(pass)) {
    return res.status(401).json({ message: process.env.USER_PASS });
  }
}

//! ****************************** CRUD ******************************

/**
 * CREATE USER
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
exports.createUser = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    let image = accents.remove(fields.name).toLowerCase() + "-" + Date.now() + "." + process.env.IMG_EXT;
    this.checkCredentials(fields.email, fields.pass, res);
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
exports.updateUser = (req, res, next) => {
  form.parse(req, (err, fields, files) => {

    if (err) {
      next(err);
      return;
    }

    this.checkCredentials(fields.email, fields.pass, res);
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
exports.deleteUser = (req, res) => {
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
 * @param {function} next 
 */
exports.sendMessage = (req, res, next) => {
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

"use strict";

const bcrypt      = require("bcrypt");
const formidable  = require("formidable");
const fs          = require("fs");
const nem         = require("nemjs");
const accents     = require("remove-accents");

const UserModel = require("../model/UserModel");

require("dotenv").config();

const form = formidable({ 
  uploadDir: process.env.IMG_URL, 
  keepExtensions: true 
});

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

/**
 * GET IMAGE NAME
 * @param {string} name 
 */
exports.getImgName = (name) => {

  return accents.remove(name).toLowerCase() + "-" + Date.now() + "." + process.env.IMG_EXT;
}

/**
 * GET USER
 * @param {string} name 
 * @param {string} email 
 * @param {string} image 
 * @param {string} pass 
 * @returns 
 */
exports.getUser = (name, email, image, pass) => {

  return {
    name: name,
    email: email,
    image: image,
    pass: pass
  }
}

/**
 * SET MESSAGE
 * @param {string} fields 
 * @param {object} res 
 */
exports.setMessage = (fields, res) => {
  const mailer = nem.createMailer();

  (async function(){
    try {
      let mail = nem.createMessage(fields);

      await mailer.sendMail(mail, function() {
        res.status(200).json({ message: process.env.USER_MESSAGE });
      });
    } catch(e){ console.error(e); }
  })();
}

//! ****************************** MAIN ******************************

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
  form.parse(req, (err, fields) => {

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
  form.parse(req, (err, fields) => {

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
            let newUser = this.getUser(user.name, user.email, user.image, hash);

            UserModel
              .updateOne({ _id: user._id }, { ...newUser, _id: user._id })
              .then(() => { this.setMessage(fields, res) })
              .catch((error) => res.status(500).json({ error }));
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  })
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

    this.checkCredentials(fields.email, fields.pass, res);
    let image = this.getImgName(fields.name);
    nem.createImage(files.image.newFilename, image);

    bcrypt
      .hash(fields.pass, 10)
      .then((hash) => {
        let user = new UserModel(this.getUser(fields.name, fields.email, image, hash));

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
      image = this.getImgName(fields.name);
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
        .catch((error) => res.status(500).json({ error }));
    }

    bcrypt
      .hash(fields.pass, 10)
      .then((hash) => {
        let user = this.getUser(fields.name, fields.email, image, hash);

        UserModel
          .updateOne({ _id: req.params.id }, { ...user, _id: req.params.id })
          .then(() => res.status(200).json({ message: process.env.USER_UPDATED }))
          .catch((error) => res.status(500).json({ error }));
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
          .catch((error) => res.status(500).json({ error }));
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
  form.parse(req, (err, fields) => {

    if (err) {
      next(err);
      return;
    }

    this.setMessage(fields, res);
  })
}

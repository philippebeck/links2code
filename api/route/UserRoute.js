"use strict";

const express   = require("express");
const router    = express.Router();
const nem       = require("nemjs");
const UserCtrl  = require("../controller/UserCtrl");

router.get("/", nem.checkAuth, UserCtrl.list);
router.post("/login", UserCtrl.login);
router.post("/forgot", UserCtrl.forgot);
router.post("/", nem.checkAuth, UserCtrl.create);
router.put("/:id", nem.checkAuth, UserCtrl.update);
router.delete("/:id", nem.checkAuth, UserCtrl.delete);
router.post("/send", UserCtrl.send);

module.exports = router;

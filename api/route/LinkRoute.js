"use strict";

const express   = require("express");
const router    = express.Router();
const nem       = require("nemjs");
const LinkCtrl  = require("../controller/LinkCtrl");

router.get("/", LinkCtrl.list);
router.post("/", nem.checkAuth, LinkCtrl.create);
router.put("/:id", nem.checkAuth, LinkCtrl.update);
router.delete("/:id", nem.checkAuth, LinkCtrl.delete);

module.exports = router;

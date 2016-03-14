'use strict';
var express = require('express');
var router = express.Router();
var models = require("../models");





router.get('/', function (req, res, next) {
	res.send("Here");
});

module.exports = router
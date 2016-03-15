'use strict';
var express = require('express');
var router = express.Router();
var models = require("../models");
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
	Page.find()
	.then(function(foundPages){
	// console.log(foundPages[0].title)
  		res.render('index', {
  			pages: foundPages,
  			title: foundPages.title,
  			urlTitle: foundPages.urlTitle
  })
 })
});

router.post('/', function (req, res, next) {
	var page = new Page({
		title: req.body.title,
		content: req.body.content,
		tags: req.body.tags.split(" ")
	});
	console.log(req.body.tags);

	page.save()
	.then(function(page) {
		console.log(page);
		res.redirect(page.route);
	})
	.then(null, next);
});

router.get('/add', function (req, res, next) {
	res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
	Page.findOne({ urlTitle: req.params.urlTitle }).exec()
	.then(function(foundPage){
		console.log(foundPage);
    	res.render('wikipage', {
    		content: foundPage.content,
    		title: foundPage.title,
    		tags: foundPage.tags.join(" ")
    	});
  		}).then(null, next);
});



module.exports = router


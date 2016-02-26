var express = require('express');
var router = express.Router();
var Article = require('../models/article');
router.get('/articles/:id',function(req,res,next){
	return Article.findOne({_id: req.params.id}).exec()
	.then(function(art){
		if (art === null){
			res.statusCode=500;
			next;
		}
		else {
			res.statusCode=200;
			res.send(art)
		}
	})
	.then(null,next)
})

router.get('/articles',function(req,res,next){
	res.statusCode=200;
	Article.find({})
	.then(function(art){
		res.send(art)
	})
})

router.post('/articles', function(req,res,next){
	// Article.create({
	// 	title: req.body.title,
	// 	content: req.body.content
	// },
	// function(err){
	// 	if (err) return handleError(err);
	// 	next;
	// }
	// )
	// next;
	var art = new Article({
		title: req.body.title,
		content: req.body.content
	})

	art.save()
	.then(function(saved){
		
		//res.statusCode=200;
		//console.log(saved)
		res.status(200).json(saved);
		//res.end();
	})


})

router.put('/articles/:id',function(req,res,next){
	Article.findOne({_id:req.params.id}).exec()
	.then(function(art){
		if(!art){
			res.sendStatus(500);
		}
		else {
			art.title = req.body.title;
			return art.save()
		}
	})
	.then(function(art){
		res.statusCode=200;
		res.json(art);
	})
	.then(null,next)
})



module.exports = router;

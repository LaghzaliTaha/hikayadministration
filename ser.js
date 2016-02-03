var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./model/db');
var http=require('http');
var morgan = require('morgan');
var app=express();

var multer      =    require('multer');//** upload
var done        =    false;  //**upload

var article =require('./model/articles.js');



var server =http.createServer(function(request,response){
response.writeHead(200,{"Content-Type":"text/plain"});

});

app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname + '/views/'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


  //**configuration upload
  app.use(multer({ dest: './public/uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

//**upload image post

app.post('/inserer',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");

	mongoose.model('article').create({
	article_name :req.body.article.name,
	article_summary: req.body.article.summary,
	article_image :'/uploads/'+req.files.userPhoto.name,
	});
	}
});
//**ajout des parties
app.post('/addPart',function(req,res){
  mongoose.model('article').update(
{ _id :req.body.id},
            { $push: {'parts':{content :req.body.content}}}
              ,  {upsert:true}
              ,function(error,result){
                   }
              );
			  res.redirect('/');
  });

//affichage des histoire
app.get('/Affichage',function(req,res){
   mongoose.model('article').find(function(err,article){
   if (err)
   res.send(err);
   res.json(article);
   });
});

app.get('/storiesShow',function(req,res){
   mongoose.model('article').find(function(err,article){
   if (err)
   res.send(err);
   res.json(article);
 }).select({'article_image':1,'article_summary':1,'article_name':1});
});

app.post('/modifyArt',function(req,res){
  mongoose.model('article').find({_id:req.body.id_art},function(err,article){
  if (err)
  res.send(err);
  res.json(article);
  });
});


//modification d'une partie
app.post('/modifyPart',function(req,res){
  mongoose.model('article').update(
    { _id :req.body.id_art, 'parts._id':req.body.id_part},
            { $set: {'parts.$.content':req.body.content}}
              ,{upsert:true}
              ,function(error,result){
                   }
              );
			  res.redirect('/');
  });


/*app.listen(3000);
console.log("server running on port 3000");*/
app.listen((process.env.PORT || 3000), function(){
  console.log('listening on *:3000');
});

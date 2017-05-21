var Mongoose = require('mongoose');

//Mongoose.connect('mongodb://localhost/web-mobile-dev');
Mongoose.connect('mongodb://heroku_n6fv3s42:8sukkb1cu2p7g001l4vbmkv80u@ds017553.mlab.com:17553/heroku_n6fv3s42');
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log("Connection with database succeeded.");
});

exports.db = db;

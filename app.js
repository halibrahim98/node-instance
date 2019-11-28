var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

var app = express();
var corsOptions = {
    origin:'http://example.com'
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', productsRouter);
app.use(cors())
app.get('/products', cors(),function(req, res, next) {
    res.json({msg:'This route is CORS enabled'})
})
app.use(cors(corsOptions))


const mongoose = require('mongoose')
const config = require('./config')
const cors = require('cors')
config.init()

mongoose.connect('mongodb://0.0.0.0:27017/cs3051',{useNewUrlParser:true, useUnifiedTopology:true})

module.exports = app;
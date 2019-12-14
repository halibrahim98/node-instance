const express = require('express');
const path = require('path');

var usersRouter = require('./routes/users.route');
var postsRouter = require('./routes/posts.route');

const cors = require('cors');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const morgan = require('morgan');
const PORT = 5960;

//App Setup
var app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

//Routers
app.use('/', usersRouter);

app.use('/post', postsRouter);

app.get('/',(req,res)=>{
	res.render('index');
})

app.get('/login',(req,res)=>{
	res.render('login');
})

app.get('/register',(req,res)=>{
	res.render('register');
})

app.get('/logout',(req,res)=>{
	res.render('logout');
})

//App Listen
app.listen(PORT, ()=>{
	console.log(`App listening on port ${PORT}!`);
});

module.exports = app;
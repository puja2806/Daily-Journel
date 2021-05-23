const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require('./models/blogs');
const port = 3000;

const app = express();

const dburl = 'mongodb+srv://netninja:test1234@nodetuts.9on3i.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {console.log('connected to db')}).catch((err) => {console.log(err)});

app.listen(process.env.PORT || port);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    Blog.find().then((result) => {res.render('home', {blogss: result})}).catch((err) => {console.log(err)})
    
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/', (req, res) => {
    const blogitem = new Blog(req.body);

    blogitem.save().then((result) => {res.redirect('/')}).catch((err) => {console.log(err)});
});

app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((result) => {res.render('details', {blogs1: result})}).catch((err) => {console.log(err)});
});

app.delete('/post/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id).then((result) => {
        res.json({redirect: '/'})
    }).catch((err) => {console.log(err)});
});

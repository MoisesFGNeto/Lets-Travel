let express = require('express');
let app = express();
let mongoose = require('mongoose');
require("dotenv").config();
let multer = require('multer');
let cookieParser = require('cookie-parser');
let callbackRequestsRouter = require('./routes/callback-requests.route');
let postRouter = require('./routes/posts.route');
let emailRouter = require('./routes/emails.route');
let userRouter = require('./routes/users.route');
let Post = require('./models/post.model').Post;
let auth = require('./controllers/auth');
app.set('view engine', 'ejs');

mongoose.connect(process.env.DB,{useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

app.use(multer({storage: imageStorage}).single('imageFile'));

app.use(express.static('public'));
app.use(cookieParser());
app.use('/posts', postRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails' , emailRouter);
app.use('/users', userRouter);
app.use('/api/v1', require('./api/index'));

app.get('/landmark', async(req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('landmark', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})

app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }
})

app.get('/login', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.redirect('/admin');
    } else {
        resp.render('login');
    }
})

app.get('/requestPasswordReset', (req, res) => {
    res.render('requestPassword');
  });


app.get('/resetPassword', (req, res) => {
    const { token, id } = req.query; // extract token and id from query string
    // render the resetPassword.ejs template and pass in token and id as variables
    res.render('resetPassword', {
        token,
        id
    });
  });


let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}...`));
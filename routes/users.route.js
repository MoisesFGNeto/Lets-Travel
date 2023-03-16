let {User} = require('../models/user.model');
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

const {
    requestPasswordResetController,
    resetPasswordController,
  } = require("../controllers/auth.controller");

router.post('/login',  async (req, resp) => {
    const{email, password} = req.body;
    const users = await User.find().where({email: email});
    
    if(users.length > 0) {
        let comparisonResult = await bcrypt.compare(password, users[0].password);
        if(comparisonResult) {
            let token = auth.generateToken(users[0]);
            resp.cookie('auth_token', token);
            resp.send({
                redirectURL: '/admin',
                message: 'Sucess'
            });
        } else {
            resp.send({message: 'Rejected'});
        }
    } else {
        resp.send({message: 'Rejected'});
    }
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }
  
    const encryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
    });
  
    await newUser.save();
  
    res.status(201).json({ message: 'User successfully registered' });
  });

router.post("/requestPasswordReset", requestPasswordResetController); 
router.post("/resetPassword", resetPasswordController);

module.exports = router;
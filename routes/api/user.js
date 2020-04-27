const express = require('express');
const router = express.Router();

//password hashing
const bcrypt = require('bcryptjs');

//jwt webtoken
const jwt = require('jsonwebtoken');
//key for webtoken json sign
const keys = require('../../config/keys');


const validateSignup = require('../../validation/register');

const validateSignIn = require('../../validation/sign-in');

const User = require('../../models/User');


//Register or Sign up a new user
router.post('/sign-up', (req, res) => {
    const {errors, isValid} = validateSignup(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                errors.email = 'Email Already Exists';
                return res.status(400).json(errors);
            }
            else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                
                           
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

//User Sign-in with password and jwt token
router.post('/sign-in', (req, res) => {
    const {errors, isValid} = validateSignIn(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email})
        .then(user => {
            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {id: user.id, name: user.name};
                        
                        jwt.sign(
                            payload,
                            keys.privateKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                        });
                    }
                    else{
                        errors.password = 'Password Incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
});


module.exports = router;
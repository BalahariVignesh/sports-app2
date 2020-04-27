const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');




const validateSignup = require('../../validation/register');


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


module.exports = router;
const router= require('express').Router();
const User= require('../models/User');
const validator= require('validator');
const jwt = require('jsonwebtoken');


//LOGIN user
//Post request at /api/auth/login
router.post('/login', (req, res)=>{
        let errors= {};
    
        const {email, password}= req.body;

        //validations
        if(!email) errors.email= "Email field cannot be empty";
        if(!password) errors.password= "Password field cannt be empty";
        if(email && !validator.isEmail(email)) errors.email= "Invalid email";

        if(Object.keys(errors).length !==0 ) return res.status(500).json(errors);

        //finding the user with given email
        User.findOne({email})
        .then(user=> {
            if(!user){
                errors.email= "User not found";
                return res.status(404).json(errors);
            }
                if(password !== user.password){
                    errors.password= "Wrong Password";
                    return res.status(400).json(errors);
                }
                 //generate token
                 const payload= {
                     id: user._id,
                     email: user.email
                 }
                 const key= process.env.SECRET_KEY;

                 //sign the token
                 jwt.sign(
                     payload,
                     key,
                     {expiresIn: 300},
                     (err, token)=>{
                         if(err) throw err;
                         res.json({
                             success: true, 
                             token
                         })
                     }
                 )
        })
        .catch(err=> {
            console.log(err);
        })

})


module.exports= router;
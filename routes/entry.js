const router= require('express').Router();
const validator= require('validator');
const Entry = require('../models/TableEntry'); 
const UserModel = require('../models/User');
const auth = require('../middlewares/auth');
   

//Add a entry
//private route
//Post request at /api/entry/

router.post('/',auth,  (req, res)=>{
    let errors= {};
    const {username, email, mobile,address} = req.body;

    //validations
    if(!username) errors.username= "Username field cannot be empty";
    if(!email) errors.email= "Email field cannot be empty";
    if(!mobile) errors.mobile= "Mobile Number field cannot be empty";
    if(!address) errors.address= "Address field cannot be empty"
    if(username && !validator.isAlphanumeric(username)) errors.username="Username can be alphanumeric only";
    if(email && !validator.isEmail(email)) errors.email= "Invalid email";
    if(mobile && !validator.isInt(mobile)) errors.mobile="Please enter valid mobile number";
    if(mobile && mobile.length !== 10) errors.mobile="Mobile number should be of 10 digits";

    if(Object.keys(errors).length !==0 ) return res.status(500).json(errors);


    //check if email already exists
    Entry.findOne({email})
        .then(entry =>{
            if(entry) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            }

            // check if username already exists
            Entry.findOne( {username})
            .then(entry=>{
                if(entry) {
                    errors.username= 'Username already exists';
                    return res.status(400).json(errors);
                }
                //creating new entry
                const newEntry=new Entry({
                    username,
                    email,
                    mobile,
                    address
                });
            
                    //save entry to database
                newEntry.save()
                    .then( entry=> res.status(200).json(entry))
                    .catch(err=> console.log(err));
            })
            .catch(err=> console.log(err));
                })
        .catch(err => console.log(err));

})

//Get all the entries
//Private route
//GET request at /api/entry/

router.get('/',auth,  (req, res)=>{
    Entry.find()
        .then(entry=> res.status(200).json(entry))
        .catch(err=> console.log(err));
})

//Delete particular entry
//Private Route
//Delete request at /api/entry/:id

router.delete('/:id', (req, res)=>{
    const id= req.params.id;
    Entry.findByIdAndDelete(id)
        .then((entry)=> res.status(200).json(entry))
        .catch(err=> console.log(err));
})
module.exports= router;     
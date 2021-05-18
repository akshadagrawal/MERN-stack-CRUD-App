const mongoose= require('mongoose');
const UserSchema= mongoose.Schema({
    email:{
        type: String,
        isRequired: true,
        unique: true
    },
    password: {
        type: String,
        isRequired: true,
        min:6
    }
});

const UserModel= mongoose.model('User', UserSchema );
module.exports= UserModel;
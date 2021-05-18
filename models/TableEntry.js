const mongoose= require('mongoose');
const EntrySchema= mongoose.Schema({
    username: {
        type: String,
        isRequired: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        isRequired: true,
    },
    address:{
        type: String,
        isRequired: true
    }
},{timestamps: true});

const EntryModel = mongoose.model('Entry', EntrySchema);

module.exports= EntryModel;

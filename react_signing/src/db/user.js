const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name: String,
    email: String,
    date: String,
    mobile: String,
    password:String,
    country: String,
    state:String,
    city:String,
});


// const User = new mongoose.model("User",userSchema)

 module.exports = mongoose.model('User',userSchema);

const mongoose= require("mongoose")
mongoose.connect("mongodb://localhost:27017/SignUp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=>{
    console.log("DataBase is Connected");
}).catch(()=>{
    console.log("DataBase Connection failed");
})


const newSchema =new mongoose.Schema({
    username:String,
    dob:String,
    email:String,
    mobilenum:String,
    password: String,
    country:String,
    state:String,
    city:String
})


const collection = mongoose.model("collection",newSchema);

module.exports = collection;





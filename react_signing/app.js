const express = require("express");
const collection = require("./mongo.js");
const country = require("./src/db/countries");
const state = require("./src/db/states");
const city = require("./src/db/city");
const User = require("./src/db/user");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


   // post  Data UI to mongoDB
app.post("/post",async(req, res)=>{
let sign = new User(req.body);
let result = await sign.save();

res.send(result)
})

//get Data mongoDB to UI
app.get('/user', async(req, res) =>{
    let userId = req.query.user; 
    let Users = await User.find({ user: userId });
    res.send(Users);
});

//put Data 
app.put('/user/:id', async(req, res) =>{
    let userId = req.params.id; 
    const updatedData = req.body;
    try {
        let result = await User.updateOne({ _id: userId }, {$set:updatedData});
        if(result.modifiedCount===1){
           // console.log(result);
            res.send(updatedData);
            
        }
   else{
    res.send(updatedData);
    console.log(updatedData);
   }
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal server error");
    }

});


//Routes

app.get("/", (req, res)=> {
    res.send("My API")
})
// app.get("/get", async(req, res)=>{
//     let user = new collection(req.body);
//     let result = await user.save();

//     res.send(result)
// })

app.post("/country",async (req, res) => {
    let Country = new country(req.body);
    let result= await Country.save();     
    res.send(result);
});

app.get('/country', async(req, res) =>{ 
    let Country=await country.find();
    res.send(Country);
});


app.post("/state", async (req, res) => {
    let State = new state(req.body);
    let result= await State.save();     
    res.send(result);
});

app.get('/state', async(req, res) =>{
    let countryId = req.query.country; 
    let States = await state.find({ country: countryId });
    res.send(States);
});

app.post("/city", async (req, res) => {
    let City = new city(req.body);
    let result= await City.save();
    res.send(result);
});

app.get('/city', async(req, res) =>{ 
    const stateId = req.query.state;
    const City = await city.find({ state: stateId });
    res.send(City);
});

//// index.js for authentiaction //
app.post("/login", async (req, res)=> {
    //const { email, password} = req
    const email = req.body.email
    const password = req.body.password
    let Users = await User.find({email: email});
    if(Users){
        if(password === Users[0].password){
            res.send({message: "Login Successful",Users})
        }
    }else{
        res.send("User not registered")
    }
    console.log("Users",Users)
    return
 })

// app.post("/home", (req,res)=>{
//  const {name, email,date, mobile, password,} = req.body
//  User.findOne({email:email}, (err,user) => {
//     if(user){
//         res.send({message: "User already resgifer"})
//     } else {
//         const user = new User({
//             name, email,date, mobile, password
//          })
//          user.save(err => {
//             if(err) {
//                 res.send(err)
//             }else {
//                 res.send({message: "Successful", user})
//             }
//          })
//     }
//  })
// })

// app.post('/home',async (req,res)=>{
//     let Signup = new Signup(req.body);
//     let result= await Signup.save();
//     res.send(result);
//     console.log("result",result);
// });

const CountryStateCity = async () => await data.save();

app.listen(5000,()=>{
    console.log("Port Connected ");
})

const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const {validatorSignup} = require("./utils/validator");
const bcrypt = require("bcrypt");
app.use(express.json()); //middleware
//creating post api
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  // const user = new user({
  //     firstName: "aarif",
  //     lastName: "raza",
  //     emailId: "aarif@gmail.com",
  //     password: "123",
  //     age: "18"
  // })
  try {
    validatorSignup(req);
    const {firstName,lastName,emailId, password}= req.body;
    //encryp the password
    // const {password}= req.body;
    const passwordHash = await bcrypt.hash(password,10 );
     console.log(passwordHash);
  //creating new instance of user model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  }); //
    await user.save();
    res.send("user added successfully");
  } catch(err) {
    res.status(400).send("unable to save to db" + err.message);
  }
});

//login api
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("user does't exist");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).send("password does't match");
    } else {
      res.send("login successfull");
    }
  } catch (err) {
    res.status(400).send("unable to login" + err.message);
  }
});
//creating get method
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(400).send("user does't exist");
    } else {
      res.send(user);
    }
  } catch {
    // res.status(400).send("something went wrong" + err.message);
  }
});
//feed api - GET/feed // to get ll data present from docuemnt
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch {
    res.status(400).send("something went wrong" + err.message);
  }
});

app.delete("/delete", async (req, res) => {
    const userId = req.body.userId;
    try {
        // const user = await User.findByIdAndDelete(userId);
        const user = await User.findByIdAndDelete({ _id: userId});
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send("User deleted successfully");
        }
    } catch (err) {
        res.status(500).send("Something went wrong: " + err.message);
    }
});

app.patch("/signup", async (req,res)=>{
    
})
 
connectDB()
  .then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("error connectiong to db");
  });

// const adminAuth = require('./middlewares/auth')

// //Error handling with proper error message and status code
// app.use('/', (err,req, res, next)=>{
//     if(err){
//         res.status(401).send("something went wrong"); //sending error msg with response and status code
//         next();
//     }
//     else{
//         console.log('home');
//         res.send("action success");

//     }
// })

// // adding authentication
// app.use('/admin', adminAuth) //applying auth on all routes starting with /admin
// app.get('/admin/admindetails', (req,res)=>{    // auth will be checked here also
//     res.send("admindetails") ; //route handler
// })
// app.get('/admin/admindetails2', (req,res)=>{   // auth will be checked here also
//     res.send("admindetails2") ;
// })

// app.use('/deleteuser', (req,res)=>{
//     const token = "xyz";
//     const Isauth = token ==="xyz";
//     if(Isauth){
//         res.send("data deleted")
//     }
//     else{
//         res.status(401).send("Unauthorized request");
//     }
// })
// app.get('/test', (req,res, next)=>{
//     console.log('test2');
//     // res.send('hello from home');
//     // next();
// })

// app.use('/test',
//     (req,res, next)=>{
//         console.log("test3");
//     // res.send('hello from test3');
//     next();

//     // (req,res) =>{
//     //     console.log("test2")
//     //     res.send('hello from test2');

// })

// // givng ports no to listen on server

// app.listen(3000,() =>{
//     console.log('server is running on port 3000')
// })

const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require('./models/user')

app.use(express.json());
//creating post api
app.post("/signup",async (req, res)=>{
   
    
    console.log(req.body); 
    //creating new instance of user model
    const user = new User(req.body); // 
    // const user = new user({
    //     firstName: "aarif",
    //     lastName: "raza",
    //     emailId: "aarif@gmail.com",
    //     password: "123",
    //     age: "18"
    // })
    try {
    await user.save();
    res.send("user added successfully");
    }
    catch{
        res.status(400).send("unable to save to db" + err.message);
    }
})

connectDB()
.then(()=>{
    console.log("connected to db")
    app.listen(3000,() =>{
        console.log('server is running on port 3000')
    })
})
.catch((err)=>{
    console.log("error connectiong to db");
})

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
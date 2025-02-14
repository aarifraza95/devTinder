const express = require('express');
const app = express();

const adminAuth = require('./middlewares/auth')
// app.use('/',
//     (req, res, next)=>{
//     console.log('home');
//     res.send('hello from 1');
//     next();
// });

app.use('/admin', adminAuth)
app.get('/admin/admindetails', (req,res)=>{
    res.send("admindetails") ; 
})
app.get('/admin/admindetails2', (req,res)=>{
    res.send("admindetails2") ; 
})
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

app.listen(3000,() =>{
    console.log('server is running on port 3000')
})
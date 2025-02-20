const validator = require('validator')

const validatorSignup = (req)=>{
    const {firstName, lastName, emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    // else if(firstName.length < 4 || firstName.length > 50 || lastName.length < 4 || lastName.length > 50){
    //     throw new Error("Name should be between 3-50 letters");
    // }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }   
     else if(!validator.isStrongPassword(password)){
        throw new Error("Password should be strong");
    }
}
module.exports = { 
    validatorSignup,
};
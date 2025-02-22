const express = require("express");
const authRouter = express.Router();
const { validatorSignup } = require("../utils/validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validateEditProfilesData = require("../utils/validator");

authRouter.post("/signup", async (req, res) => {
  try {
    validatorSignup(req);
    const { firstName, lastName,gender,age, emailId, password ,skills,about} = req.body;
    //encryp the password
    const passwordHash = await bcrypt.hash(password, 10);
    //creating new instance of user model
    const user = new User({
      firstName,
      lastName,
      gender,
      age,
      about,
      emailId,
      password: passwordHash,
      skills,
    }); //
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("unable to save to db" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credenctials");
    }
    //comparing plain password with hashed password
    const isPasswordMatch = await user.validatePassword(password);
    if (isPasswordMatch) {
      //create json web token
      const token = await user.getJWT();
      // add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 360000),
        httpOnly: true,
      });
      res.send("login successfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
    // res.clearCookie("token");
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
    res.send("logged out successfully");
})

authRouter.get("/login", async (req, res) => {});
module.exports = authRouter;

const bcrypt = require("bcrypt");
const User = require("../model/user_model");
const jwt = require('./jwt');
module.exports = {

  loginUser: async (req, res, next) => {
    try {
      let username = req.body.username;
      let password = req.body.password;

      const user = await User.findOne(
        { username: username }
      );
      if (!user) throw Error("User Does not exist");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error("Invalid credentials");

      //Creating a Token and making a session
      const token = jwt.generateToken(
        {
          name: user.name,
          username: user.username,
          userType: user.userType
        },
        "48h"
      );

      if (!token) throw Error("Couldnt sign the token");

      req.session.token = token;
      next();
    } catch (error) {
      console.log(error);
      res.status(405).json({
        status: "NOT OK",
        message: error.message,
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const {username, password} = req.body;

      const user = await User.findOne({ username }, "username");
      if (user) throw Error("User already exists");

      const salt = await bcrypt.genSalt(15);
      if (!salt) throw Error("Something went wrong with bcrypt");
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error("Something went wrong hashing the password");

      const newUser = new User();
      newUser.name = req.body.name;
      newUser.username = req.body.username;
      newUser.password = hash;
      newUser.userType = req.body.userType;


      const savedUser = await newUser.save();
      if (!savedUser)
        throw Error("Something went wrong while saving the user");

      res.status(200).json({
        status: "OK",
        message: "User Created Successfully",
      });
    } catch (error) {
      console.log(error.message);
      res.status(405).json({
        status: "NOT OK",
        message: error.message,
      });
    }
  },

  fetchUser: async (req, res, next) => {
    try {
      let username = res.locals.user.username;
      const results = await User.findOne(
        {
          username: username
        },
        "-password"
      );
      if (results) res.status(200).send(results);
      else
        res.status(404).json({
          status: "NOT OK",
          message: "Cannot Find Anything",
        });
    } catch (error) {
      console.log(error.message);
      res.status(405).send({
        status: "NOT OK",
        message: error.message,
      });
    }
  },
};

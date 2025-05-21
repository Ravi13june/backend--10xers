const User = require("../models/users.model");

exports.getAllUser = async (req, res) => {
    try{
     
     const users = await User.findAll();
     res.json(users);
    }
     catch (error) {
       res.status(500).json({ message: "Internal server error" });
     }
   };
const User = require('../modules/userModel');

const createUser = async (req, res) => {
    try {
        const {userId, name, email, phone, username, password, type} = req.body; 
        
        if(!userId || !name || !email || !phone || !username || !password || !type){
            res.status(400).json({ message: "Missing required fields." });
        };

        const newUser = new User({userId, name, email, phone, username, password, type});
        await newUser.save();
        res.status(201).json({ message: "New user created successfully", User: newUser });
    }
    catch (err) {
        res.status(500).json({message: "Failed to create user"});
    }
};


const viewAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({message: "Failed to fetch users"});
    }
};

module.exports = {createUser, viewAllUsers};
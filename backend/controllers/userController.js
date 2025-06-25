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


const viewUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findOne({userId});

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ message: 'Invalid user ID', error: err.message });
    }
};


const viewUserByType = async (req,res) => {
    try{
        const{type} = req.params;
        const users = await User.find({type});
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({ message: 'Failed to fetch users by type', error: err.message });
    }
};


const updateUser = async (req,res) => {
    try{
        const {userId} = req.params;
        const {name, email, phone, username, password, type} = req.body;

        const user = await User.findOne({userId});

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        };

        const updateUser = await User.findOneAndUpdate(
            {userId}, {userId, name, email, phone, username, password, type}, {new: true} 
        );

        res.status(200).json({ message: "User updated successfully", User: updateUser });
    }
    catch(err){
        res.status(500).json({ message: 'Failed to fetch users by type', error: err.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findOneAndDelete({userId});
        res.status(200).json({ message: "User deleted successfully", User: user });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
};

module.exports = {createUser, viewAllUsers, viewUser, viewUserByType, updateUser, deleteUser};
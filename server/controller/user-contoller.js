const User = require("../model/User");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch users" });
    }
}

const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password asynchronously
        const user = new User({
            name,
            email,
            password: hashedPassword,
            blogs: []
        });

        await user.save();
        return res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create user" });
    }
}

const logIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); // Compare password asynchronously
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        return res.status(200).json({ user: existingUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to log in" });
    }
}

module.exports = { getAllUser, signUp, logIn };

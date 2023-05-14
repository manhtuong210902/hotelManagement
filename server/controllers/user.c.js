const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.m");

class userController {
    //route [GET] :/api/auth
    //desc check user logged in ?
    //access public
    async loadUser(req, res, next) {
        try {
            const user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res.status(400).json({
                    sucesss: false,
                    message: "User not found",
                });
            }

            return res.json({ success: true, user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    //@route [POST] :/api/user/login
    //@desc login user
    //@access public
    async login(req, res, next) {
        const { email, password } = req.body;
        console.log(req.body);
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "user not found",
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    success: false,
                    message: "wrong password",
                });
            }

            //all good
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
            return res.json({
                success: true,
                message: "logged in successfully",
                accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    //@route [POST] :/api/auth/register
    //@desc register user
    //@access public
    async register(req, res, next) {
        const { email, fullname, password } = req.body;
        try {
            //check for existing user
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "Email already taken",
                });
            }

            //all good
            //generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                email,
                fullname,
                password: hashedPassword,
            });

            await newUser.save();

            return res.json({
                success: true,
                message: "user created successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = new userController();

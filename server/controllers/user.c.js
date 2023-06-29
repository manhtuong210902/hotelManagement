const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.m");
const chat = require("../models/chat.m");
const Message = require("../models/message.m");
const { ObjectId } = require("mongodb");

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
                return res.json({
                    success: false,
                    message: "user not found",
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.json({
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
        const { email, fullname, cccd, password } = req.body;
        try {
            //check for existing user
            const user = await User.findOne({ email });
            if (user) {
                return res.json({
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
                cccd,
                password: hashedPassword,
            });

            const chatUser = new chat({
                customer: newUser._id,
            });

            newUser.roles.push("User");
            await newUser.save();

            const newMessage = new Message({
                idChat: chatUser._id,
                content: "Chào bạn, tôi có thể giúp gì cho bạn",
                role: true,
            });

            await newMessage.save();

            chatUser.messages.push(newMessage._id);
            chatUser.lastMessage = newMessage._id;

            await chatUser.save();

            return res.json({
                success: true,
                message: "user created successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    //@route [PUT] :/api/user/update
    async update(req, res, next) {
        const options = req.body;
        try {
            const userUpdate = await User.updateOne({ _id: req.userId }, options);
            return res.json({
                success: true,
                message: "update successfully",
                userUpdate,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //@desc search user by name and email
    //@access private
    async searchUser(req, res, next) {
        try {
            const { q } = req.query;
            const regex = new RegExp(q, "i"); // create a regular expression that matches the search query, case-insensitive
            const users = await User.find({ $or: [{ fullname: regex }, { email: regex }], _id: { $ne: req.userId } }); // find all users whose name or email matches the search query

            return res.json({
                success: true,
                users,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async addEmployee(req, res, next) {
        const newEmployee = req.body;
        try {
            //check for existing user
            const user = await User.findOne({ email: newEmployee.email });
            if (user) {
                return res.json({
                    success: false,
                    message: "Email already taken",
                });
            }

            //all good
            //generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newEmployee.password, salt);
            const newUser = new User({ ...newEmployee, password: hashedPassword });

            const chatUser = new chat({
                customer: newUser._id,
            });

            newUser.roles.push("Manager");
            await newUser.save();

            const newMessage = new Message({
                idChat: chatUser._id,
                content: "Chào bạn, tôi có thể giúp gì cho bạn",
                role: true,
            });

            await newMessage.save();

            chatUser.messages.push(newMessage._id);
            chatUser.lastMessage = newMessage._id;

            await chatUser.save();

            return res.json({
                success: true,
                message: "user created successfully",
                employee: newUser,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async deleteAccount(req, res, next) {
        try {
            const deleteUser = await User.deleteOne({ _id: req.params.id });

            return res.json({
                success: true,
                message: "Delete successfully",
                deleteUser,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async updateAccount(req, res, next) {
        const options = req.body;
        const id = req.params.id;
        console.log(options);
        try {
            const updateUser = await User.updateOne({ _id: id }, options);
            console.log(updateUser);
            return res.json({
                success: true,
                message: "update successfully",
                updateUser,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async getCustomer(req, res, next) {
        try {
            const customers = await User.find({
                roles: { $in: ["User"] },
            });

            return res.json({
                success: true,
                customers,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async getFullAccount(req, res, next) {
        try {
            const accounts = await User.find({}).select("-password");

            return res.json({
                success: true,
                accounts,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async getUserById(req, res, next) {
        try {
            const account = await User.findOne({ _id: req.params.id }).select("-password");

            return res.json({
                success: true,
                account,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async getEmployee(req, res, next) {
        try {
            const customers = await User.find({
                isManager: true,
            });

            return res.json({
                success: true,
                customers,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    async getNameUserById(req, res, next) {
        try {
            const id = req.body;
            const objID = new ObjectId(id);
            if (id) var account = await User.findOne({ _id: objID });
            if (account)
                return res.json({
                    success: true,
                    name: account.fullname,
                });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new userController();

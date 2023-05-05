const User = require('../database/schemas/user.schema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try{
        const user = await findUserByEmail(req.body.email);
        if(user.email){
            return res.status(400).json({
                message : "Email already taken",
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: hashedPassword,
        });
        const response = await newUser.save();
        return res.status(200).json({
            message: "user created",
            data: response._doc
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Internal server error"
        });
    }
}

const login = async (req, res) => {
    try{
        //check if username already exist
        const user = await findUserByEmail(req.body.email);
        if(!user){
            return res.status(400).json({
                message: "Email not found",
                success: false,
            })
        }
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if(!isMatched){
            return res.status(400).json({
                message: "wrong password"
            })
        }

        //create token
        const token = jwt.sign({
            email: user.email,
            role: user.role,
            name: user.name,
        }, process.env.SECRET, {expiresIn: "3 days"});

        let result = {
            name: user.name,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168,
        };

        return res.status(200).json({
            ...result,
            message: "You are now logged in",
        })

    }catch(err){
        console.log("err", err);
        return res.status(400).json({
            message: "Internal server error"
        });
    }
}

const validateUsername = async (username) => {
    const user = await User.findOne({ username });
    return user ? true : false;
}

const findUserByEmail = async (value) => {
    const user = await User.findOne({email: value});
    return user ? user : false;
}
module.exports = {
    signup, login,
}
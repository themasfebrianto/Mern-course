import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password || userName === "" || email === "" || password === "") {
            next(errorHandler(400, 'All fields are required'))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.json("SignUp Successful");
    } catch (error) {
        next(error);
    }
}
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/users");

// create new user
router.post("/signup", async (req, res) => {
    try {
        // const { name, userid, password, passwordconfirm } = req.body;

        // validation check
        if (
            !req.body.name ||
            !req.body.userid ||
            !req.body.password ||
            !req.body.passwordconfirm
        )
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." });
        if (password.length < 8)
            return res.status(400).json({
                msg: "The password needs to be at least 8 characters long.",
            });
        if (password !== passwordconfirm)
            return res.status(400).json({
                msg: "It is not same password.",
            });

        // existing user check
        const existingUser = await Users.findOne({ userid: userid });
        if (existingUser)
            return res.status(400).json({
                msg: "The user ID already exists",
            });

        // bcrypt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new Users({
            name,
            userid,
            password: passwordHash,
        });

        const saveUser = await newUser.save();
    } catch (err) {
        res.status(500).json(`Error: ${err}`);
    }
});

// login user
router.post("/login", async (req, res) => {
    try {
        const { name, userid } = req.body;

        // validation check
        if (!userid || !password)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." });

        const user = await Users.findOne({ userid: userid });
        if (!user)
            return res
                .status(400)
                .json({ msg: "This account is not registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                userid: user.userid,
                name: user.name,
            },
        });
    } catch {
        res.status(500).json(`Error: ${err}`);
    }
});

// middleware for delete
const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            res.status(401).json({
                msg: "No authentication token, authorization denied.",
            });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            res.status(401).json({
                msg: "Token verification failed, authorization denied.",
            });

        req.user = verified.id;
        next();
    } catch (err) {
        res.status(500).json(`Error: ${err}`);
    }
};

// delete account
router.delete("/delete", auth, async (req, res) => {
    try {
        const deleteUser = await Users.findByIdAndDelete(req.user);
        res.json(deleteUser);
    } catch (err) {
        res.status(500).json(`Error: ${err}`);
    }
});

module.exports = router;

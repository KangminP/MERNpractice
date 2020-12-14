const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const authorize = require("../middleware/auth");

const User = require("../models/users");

// login user
router.post("/login", (req, res, next) => {
    let getUser;
    User.findOne({
        email: req.body.email,
    })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    msg: "Auth failed.",
                });
            }
            getUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((response) => {
            if (!response) {
                return res.status(401).json({
                    msg: "Auth failed.",
                });
            }
            let jwtToken = jwt.sign(
                {
                    email: getUser.email,
                    userId: getUser._id,
                },
                "longer-secret-better",
                {
                    expiresIn: "1h",
                }
            );
            res.status(200).json({
                token: jwtToken,
                expiresIn: 3600,
                msg: getUser,
            });
        })
        .catch((err) => {
            return res.status(401).json({
                msg: "Auth failed.",
            });
        });
});

// create a new user
router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 8).then((hash) => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        });
        user.save()
            .then((response) => {
                res.status(201).json({ msg: "User created", result: response });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    });
});

router.route("/alluser").get(authorize, (req, res) => {
    User.find((error, response) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json(response);
        }
    });
});

module.exports = router;

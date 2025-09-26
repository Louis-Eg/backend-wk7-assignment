const User = require("../models/user.js");

exports.renderLogin = (req, res) => {
  res.render("login");
};

exports.renderSignup = (req, res) => {
  res.render("signup");
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
        user.loggedIn = true;
        await user.save();
        req.session.userId = user._id;
        res.redirect("/dashboard");
    } else {
        res.send("Invalid credentials");
    }
};

exports.signupUser = async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.send("Username already taken");
    }

    const newUser = new User({ username, password, loggedIn: true });
    await newUser.save();
    req.session.userId = newUser._id;
    res.redirect("/login");
};

const User = require("../models/user");

// signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("Users/signup.ejs");
};

// signup logic
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        return req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash("success", "Welcome to Wanderlust!");
            return res.redirect("/listings"); 
        });

    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup"); 
    }
};

// login form
module.exports.renderLoginForm = (req, res) => {
    res.render("Users/login.ejs");
};

// login logic
module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    return res.redirect(redirectUrl); 
};

// logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.flash("success", "You are logged out!");
        return res.redirect("/listings"); 
    });
};
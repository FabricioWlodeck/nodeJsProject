const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn} = require("../lib/auth.js");


//GET renderiza el formulario
router.get("/signup", isNotLoggedIn, (req, res)=>{
    res.render("auth/signup.hbs");
});

//POST recive los datos del formulario

router.post("/signup", passport.authenticate("local.signup", {
     successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true, //mensajes de error
}))

router.get("/signin", isNotLoggedIn,(req, res) =>{
    res.render("auth/signin.hbs");
});

router.post("/signin", (req, res, next)=>{
    passport.authenticate("local.signin", {
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true,
    }) (req, res, next);
});

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile.hbs");
});

router.get("/logout", (req, res)=>{
    req.logOut((e)=>{
        if(e){
            return next(e);
        }
        res.redirect("/signin");
    });
});

module.exports = router;
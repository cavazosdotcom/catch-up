const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    const list = require("../seeds/mediaData.json");
    res.render("list", {logged_in: req.session.logged_in, list});
});

router.get("/media", withAuth, async (req, res) => {
    res.render("media", {logged_in: req.session.logged_in});
})

router.get("/register", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("register");
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

module.exports = router;
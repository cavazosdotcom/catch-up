const router = require("express").Router();
const {List, Media, MediaList} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {

    try{
        const listData = await List.findAll({
            where:{
                user_id: req.session.user_id
            },
            include: [{ model: Media, through: MediaList }],
        });
        const list = await listData.toJSON();
        res.json(list)
        console.log(list);
        console.log("works!!!!!")
        // res.render("list", {logged_in: req.session.logged_in, list});
    }catch(error){

    }
});

router.get("/media", withAuth, async (req, res) => {
    res.render("media", {logged_in: req.session.logged_in});
});

router.get("/media/:id", async (req, res) => {
    const media_id = req.params.id;
    res.render("media", {logged_in: req.session.logged_in, media_id})
});

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
const router = require("express").Router();
const { User, Media, List, MediaList } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {



module.exports = router;
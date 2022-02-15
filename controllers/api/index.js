const router = require("express").Router();
const userRoutes = require("./userRoutes");
const mediaRoutes = require("./mediaRoutes");
const listRoutes = require("./listRoutes");

router.use("/users", userRoutes);
router.use("/media", mediaRoutes);
router.use("/lists", listRoutes);

module.exports = router;
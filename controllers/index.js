const router = require("express").Router();
const homeRoute = require("./home-routes");
router.use("/", homeRoute);
router.use("/api", require("./api"));

module.exports = router;

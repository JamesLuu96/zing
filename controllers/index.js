const router = require("express").Router();
const homeRoute = require("./home-routes");
router.use("/", homeRoute);

module.exports = router;

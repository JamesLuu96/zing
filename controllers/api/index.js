const router = require("express").Router();

const userRoutes = require("./user-routes");
const roomRoutes = require("./room-routes");
const typeRoutes = require("./type-routes");

router.use("/users", userRoutes);
router.use("/rooms", roomRoutes);
router.use("/types", typeRoutes);

module.exports = router;

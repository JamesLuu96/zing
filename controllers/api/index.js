const router = require("express").Router();

const userRoutes = require("./user-routes");
const roomRoutes = require("./room-routes");
const chatRoutes = require("./chat-route");

router.use("/users", userRoutes);
router.use("/rooms", roomRoutes);
router.use("/chats", chatRoutes);
// router.use("/types", typeRoutes);

module.exports = router;

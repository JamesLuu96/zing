const router = require("express").Router();
const sequelize = require("../config/connection");
const { Room, User } = require("../models");
const path = require("path");

// get all rooms for homepage
router.get("/", (req, res) => {
	console.log("======================");
	Room.findAll({
		attributes: ["id", "room_name", "type_id", "user_id", "created_at"],
		include: [
			{
				model: User,
				attributes: ["id", "username"],
			},
			{
				model: Type,
				attributes: ["id", "type_name"],
			},
		],
	})
		.then((dbRoomData) => res.sendFile(__dirname, "../assets/html/index.html"))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// get single room
router.get("/:id", (req, res) => {
	Room.findOne({
		where: {
			id: req.params.id,
		},
		attributes: ["id", "room_name", "type_id", "user_id", "created_at"],
		include: [
			{
				model: User,
				attributes: ["id", "username"],
			},
			{
				model: Type,
				attributes: ["id", "type_name"],
			},
		],
	})
		.then((dbRoomData) => {
			if (!dbRoomData) {
				res.status(404).json({ message: "No room found with this id" });
				return;
			}
			res.json(dbRoomData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// router.get("/login", (req, res) => {
// 	if (req.session.loggedIn) {
// 		res.redirect("/");
// 		return;
// 	}

// 	res.render("login");
// });

module.exports = router;

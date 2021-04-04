const router = require("express").Router();
const sequelize = require("../config/connection");
const { Room, User, Type } = require("../models");
const path = require("path");
const {users} = require("../utils")

// get all rooms for homepage

router.get("/login", (req, res) => {
	res.render("login");
});

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
		.then((dbRoomData) => {
			rooms = dbRoomData.map((x) => x.get({ plain: true }));
			res.render("homepage", { rooms, users: users });
		})
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
			const room = dbRoomData.get({ plain: true });
			res.render("chatroom1", room);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;

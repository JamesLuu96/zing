const router = require("express").Router();
const sequelize = require("../config/connection");
const { Room, User, Type } = require("../models");
const path = require("path");
const { users } = require("../utils");
const withAuth = require("../utils/auth");

// get all rooms for homepage
router.get("/", withAuth, (req, res) => {
	let roomsData;
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
			roomsData = dbRoomData.map((x) => x.get({ plain: true }));
		})
		.then(() => {
			Type.findAll({
				attributes: ["id", "type_name"],
			}).then((dbTypeData) => {
				const types = dbTypeData.map((type) => type.get({ plain: true }));
				res.render("homepage", {
					types,
					rooms: roomsData,
					users: users,
					loggedIn: req.session.loggedIn,
				});
				console.log(types);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.get("/signup", (req, res) => {
	res.render("signup");
});

// get single room
router.get("/:id", withAuth, (req, res) => {
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
			console.log(room);
			res.render("chatroom", {
				room,
				loggedIn: req.session.loggedIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;

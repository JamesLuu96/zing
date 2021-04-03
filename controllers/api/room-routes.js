const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Room, User, Type } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
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
		.then((dbRoomData) => res.json(dbRoomData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

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

router.post("/", withAuth, (req, res) => {
	Room.create({
		room_name: req.body.room_name,
		type_id: req.body.type_id,
		user_id: req.session.user_id,
	})
		.then((dbRoomData) => res.json(dbRoomData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.put("/:id", withAuth, (req, res) => {
	Room.update(
		{
			room_name: req.body.room_name,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
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

router.delete("/:id", withAuth, (req, res) => {
	console.log("id", req.params.id);
	Room.destroy({
		where: {
			id: req.params.id,
		},
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

module.exports = router;

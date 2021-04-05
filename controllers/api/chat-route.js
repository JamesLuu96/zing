const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Chat,Room, User, Type } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
router.post("/", (req, res) => {
	console.log(req.body,"hello")
	Chat.create({
		room_id: req.body.room_id,
		user_id: req.body.user_id,
		message: req.body.message,
	})
		.then((dbRoomData) => {
            res.json(dbRoomData)
            // console.log(dbRoomData)
          }  )
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

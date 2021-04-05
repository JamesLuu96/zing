const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Chat,Room, User, Type } = require("../../models");
const withAuth = require("../../utils/auth");

// get all chat
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

//find chat

router.get("/:id", withAuth, (req, res) => {
	console.log(req.params.id)
	Chat.findAll(
		{
			where: {
				room_id: req.params.id,
			}
	
	[sequelize.literal('(SELECT username,message FROM chat_db.user RIGHT  JOIN chat ON user.id=chat.user_id; )'),'messages']
		}
	)
		.then((dbRoomData) => {
			if (!dbRoomData) {
				res.status(404).json({ message: "No chat found with this room id" });
				return;
			}
			res.json(dbRoomData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

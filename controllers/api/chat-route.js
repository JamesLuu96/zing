const router = require("express").Router();
const sequelize = require("../../config/connection");
const {Chat, User} = require("../../models");
const withAuth = require("../../utils/auth");
var dateformat = require('dateformat');

// get all chat
router.post("/", (req, res) => {
    console.log(req.body, "hello")
    Chat.create({
            room_id: req.body.room_id,
            user_id: req.body.user_id,
            message: req.body.message,
        })
        .then((dbRoomData) => {
            res.json(dbRoomData)
            // console.log(dbRoomData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//find chat

router.get("/:id", withAuth, (req, res) => {
    Chat.findAll({
    //    attributes:[
    //         [sequelize.literal(`(select username, message, c.created_at from user as u inner join chat as c on c.room_id =${req.params.id};)`), 'messages']]
        attributes:[
            "created_at"
        ],
        include:{
         model:User,
         attributes:['username']   
        }
})
        .then((dbRoomData) => {
            if (!dbRoomData) {
                res.status(404).json({
                    message: "No chat found with this room id"
                });
                return;
            }
            res.json(dbRoomData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//delete old chats
router.delete("/:id", (req, res) => {
    // let now=new Date()
// dateFormat(date, "dddd, mmmm dS, yyyy");
    // console.log(now)
	Chat.destroy({
		where: {
		 room_id:req.params.id
		},
        // attributes:[
        // [sequelize.literal(`(DELETE FROM chat WHERE createdAt <=${now})`)]
        // ]
	}).then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: "No user found with this id" });
				return;
			}
			res.json(dbUserData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
module.exports = router
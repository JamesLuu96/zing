const router = require("express").Router();
const sequelize = require("../../config/connection");
const {Chat, User} = require("../../models");
const withAuth = require("../../utils/auth");
const dateFormat = require('dateformat');
var Buffer = require('buffer/').Buffer 

// const {Op} = require('sequelize')
// get all chat
router.post("/", (req, res) => {
    console.log(req.body, "oops")
    
    Chat.create({
            room_id: req.body.room_id,
            user_id: req.body.user_id,
            message: req.body.message,
            image:req.body.image
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
        where:{
            room_id:req.params.id
        },
   
        include:[{
            model:User,
            attributes:["username"]
        }]
})
        .then((dbChatData) => {
            if (!dbChatData) {
                res.status(404).json({
                    message: "No chat found with this room id"
                });
                return;
            }
        console.log(dbChatData.map(data=>data.get({plain:true})))
        res.json(dbChatData)
        //  res.json(Buffer.from(dbChatData));
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//delete old chats
router.delete("/:id", (req, res) => {
    // 2021-04-06 21:38:37
    // let now=new Date()
    // now=dateFormat(now,"yyyy-mm-dd hh:MM:ss")
    // console.log(now)

	Chat.destroy({
		where: {
		 room_id:req.params.id,
         created_at: {
             [Op.lt]: new Date()
         }
		}
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
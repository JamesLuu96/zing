const { Room } = require("../models");

const postdata = [
	{
		room_name: "Blurry",
		type_id: 2,
		user_id: 10,
	},
	{
		room_name: "Default",
		type_id: 1,
		user_id: 1,
	},
	{
		room_name: "teeny-tiny",
		type_id: 4,
		user_id: 4,
	},
	{
		room_name: "excite",
		type_id: 3,
		user_id: 3,
	},
	{
		room_name: "angERRY",
		type_id: 5,
		user_id: 1,
	},
	{
		room_name: "backwaRDS",
		type_id: 6,
		user_id: 1,
	},
	{
		room_name: "dark",
		type_id: 7,
		user_id: 1,
	},
];

const seedRooms = () => Room.bulkCreate(postdata);

module.exports = seedRooms;

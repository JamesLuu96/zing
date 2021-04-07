const { Type } = require("../models");

const userdata = [
	{
		type_name: "blurry",
	},
	{
		type_name: "excited",
	},
	{
		type_name: "tiny",
	},
	{
		type_name: "angry",
	},
	{
		type_name: "backwards",
	},
];

const seedType = () => Type.bulkCreate(userdata, { individualHooks: true });

module.exports = seedType;

const { Type } = require("../models");

const userdata = [
	{
		type_name: "default",
	},
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
	{
		type_name: "dark",
	},
     {
		type_name: "glowing",
	},
     {
		type_name: "wide",
	},
];

const seedType = () => Type.bulkCreate(userdata, { individualHooks: true });

module.exports = seedType;

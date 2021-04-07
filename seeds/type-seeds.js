const { Type } = require("../models");

const userdata = [
	{
		type_name: "anonymous",
	},
	{
		type_name: "pig latin",
	},
	{
		type_name: "tiny",
	},
	{
		type_name: "angry",
	},
	{
		type_name: "the upside down",
	},
	{
		type_name: "backwards",
	},
];

const seedType = () => Type.bulkCreate(userdata, { individualHooks: true });

module.exports = seedType;

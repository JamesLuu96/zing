// import all models
const User = require("./User");
const Room = require("./Room");
const Type = require("./Type");

// create associations
User.hasMany(Room, {
	foreignKey: "user_id",
});

Room.belongsTo(User, {
	foreignKey: "user_id",
	onDelete: "SET NULL",
});

Type.hasMany(Room, {
	foreignKey: "type_id",
});

Room.belongsTo(Type, {
	foreignKey: "type_id",
	onDelete: "SET NULL",
});

module.exports = { User, Room, Type };

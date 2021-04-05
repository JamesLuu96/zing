// import all models
const User = require("./User");
const Room = require("./Room");
const Type = require("./Type");
const Chat = require("./Chat");

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
});

Room.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.belongsToMany(Room, { through: { model: Chat, unique: false },onDelete:"CASCADE",onUpdate:"CASCADE" });
Room.belongsToMany(User, { through: { model: Chat, unique: false },onDelete:"CASCADE",onUpdate:"CASCADE"} );


module.exports = { User, Room, Type,Chat };

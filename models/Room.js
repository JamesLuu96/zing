const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Room extends Model {}

Room.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		room_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type_id: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
			references: {
				model: "type",
				key: "id",
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "user",
				key: "id",
			},
		},

	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "room",
	}
);

module.exports = Room;

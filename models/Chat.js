const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Chat extends Model {}
Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    user_id:{
      type: DataTypes.INTEGER,
      references:{
        model:"user",
        key:"id"
      } 
    },
    room_id:{
      type: DataTypes.INTEGER,
      references:{
        model:"room",
        key:"id"
      } 
    },

    // selfGranted: DataTypes.BOOLEAN,
    message:{
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "chat",
  }
);

module.exports = Chat;

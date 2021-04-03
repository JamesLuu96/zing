const Sequelize = require("sequelize");

// create connection to our db
let sequelize;

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	sequelize = new Sequelize("chat_db", "root", "root", {
		host: "localhost",
		dialect: "mysql",
		port: 3306,
	});
}

module.exports = sequelize;

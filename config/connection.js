const Sequelize = require("sequelize");

// create connection to our db
let sequelize;

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
<<<<<<< HEAD
	sequelize = new Sequelize("chat_db", "root", "!6MUOweit", {
=======
	sequelize = new Sequelize("chat_db", "root", "Crosstale94", {
>>>>>>> feature/typing
		host: "localhost",
		dialect: "mysql",
		port: 3306,
	});
}

module.exports = sequelize;

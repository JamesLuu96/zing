const Sequelize = require("sequelize");

// create connection to our db
let sequelize;

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
<<<<<<< HEAD
	sequelize = new Sequelize("chat_db", "root", "Crosstale94", {
=======
	sequelize = new Sequelize("chat_db", "root", "root", {
>>>>>>> 4d90a9e94781c97ad7542065ba3aa213625b82c3
		host: "localhost",
		dialect: "mysql",
		port: 3306,
	});
}

module.exports = sequelize;

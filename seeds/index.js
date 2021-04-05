const seedUsers = require('./user-seeds');
const seedRooms = require('./room-seeds');
const seedType = require('./type-seeds')

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');
  await seedType();
  console.log('--------------');
  await seedRooms();
  console.log('--------------');

  process.exit(0);
};

seedAll();

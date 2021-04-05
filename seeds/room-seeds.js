const { Room } = require('../models');

const postdata = [
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 10
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 8
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 1
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 4
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 7
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 4
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 1
  },
  {
    room_name: 'Testing',
    type_id: 2,
    // user_id: 1
  },
  {
    room_name: 'Testing',
    type_id: 2,
    // user_id: 9
  },
  {
    room_name: 'Testing',
    type_id: 2,
    // user_id: 5
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 3
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 10
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 8
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 3
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 3
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 7
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 6
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 4
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 6
  },
  {
    room_name: 'Testing',
    type_id: 2,
    user_id: 7
  }
];

const seedRooms = () => Room.bulkCreate(postdata);

module.exports = seedRooms;

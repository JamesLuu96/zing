// const users = [{id:1, username:'tpenniell7', room:1}];
const users = [];
console.log(users);
// Join user to chat

function userJoin(id, username, room) {
	const user = { id, username, room };
	users.push(user);
	console.table(users)
	return user;
}

// Get current user
function getCurrentUser(id) {
	return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

// Get room users
function getUsersInRoom(room) {
	console.log('getRoomUsers + ' + users)
	return users.filter((user) => user.room === room);
}

function getRoomUsers(room) {
	console.log('getRoomUsers + ' + users)
	return users.filter((user) => user.room === room).length;
}

module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
	getUsersInRoom
};

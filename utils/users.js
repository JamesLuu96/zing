
// const users = [{ id:7, username:"username", room:2 },{ id:7, username:"username", room:2 },{ id:7, username:"username", room:2 },{ id:7, username:"username", room:1 }];
const users = [];
// console.log(users);
// Join user to chat


function userJoin(id, username, room) {
	const user = { id, username, room };
	users.push(user);
	// console.table(users)
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
	return users.filter((user) => user.room === room);
}

function getRoomUsers(room) {
	return users.filter((user) => user.room === room).length;
}

function getAllUsersInRoom(){
	const userArray = []
	const userCounts = {};
	users.forEach((user)=>{
		userCounts[user.room] = (userCounts[user.room] + 1) || 1
	});
	for(key in userCounts){
		userArray.push({roomId: key, onlineUsers: userCounts[key]})
	}
	// console.log(userArray)
	return userArray
}

function getUsers(){
	return users
}


module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
	getUsersInRoom,
	getAllUsersInRoom,
	getUsers,

};

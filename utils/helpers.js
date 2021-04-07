const {getRoomUsers} = require('./users')

module.exports = {
    getRoomUsers,
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    format_plural: (word, plural) => {
        if(plural===1)return word
        return `${word}s`
    },
    format_url: url => {
        return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0];
    },
    check_room: (room_username, username) => {
        if(room_username === username){
          return true
        } else{
          return false
        }
    }
}
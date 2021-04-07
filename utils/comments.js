const comments = []
let index = 0

function addComment(username, room_id, text, image){
    const comment = {username, room_id, text, image, index}
    comments.push(comment)
    index++
    return comment
}

function deleteComment(index){
    comments.splice
}

function findComments(room_id){
    return comments.filter(comment => comment.room_id === room_id)
}

// function checkComments(room_id){
//     if(.length > 60){
        
//     }
// }


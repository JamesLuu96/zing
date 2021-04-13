const comments = []
let index = 0

function addComment(username, room_id, text){
    const comment = {username, room_id, text, index}
    comments.push(comment)
    index++
    return comment
}

function deleteComment(index){
    comments.splice(comments.findIndex(comment=>comment.index === index), 1)
}

function deleteAllComments(room_id){
    findComments(room_id).forEach(comment=>{
        deleteComment(comment.index)
    })
}

function findComments(room_id){
    console.log(`all comments: ${comments}`)
    return comments.filter(comment => comment.room_id === room_id)
}

module.exports = {
    addComment,
    deleteComment,
    deleteAllComments,
    findComments
}


var onlineUsers = [];
var chatContent = [];

const checkExistUser = (arr, un) => {
    let flag = 1;
    arr.forEach(ar => {
        if (ar.Username==un) flag = 0;
    });
    return flag;
}

const addUserToOnlineList = (user) => {
    if (checkExistUser(onlineUsers, user)) onlineUsers.push(user);
}

const addUserToChatContent = (user) => {
    if (checkExistUser(chatContent, user)) chatContent.push(user);
}

module.exports = server => {
    const io = new require('socket.io')(server);
    io.on('connection', client => {
        let ID;
        // Chat
        client.on('chat', data => {        
            //console.log(data.Username, data.msg);
            addUserToChatContent(data);
            io.emit('chat', chatContent);
        });

        // Online list
        client.on('online', user => {
            // console.log(user.Username, user.Image);
            ID = user;
            addUserToOnlineList(user);
            //console.log(onlineUsers);
            io.emit('online', onlineUsers);
        })

        client.on('disconnect', () => {
            onlineUsers = onlineUsers.filter(u => u !== ID);
        });
    })
}
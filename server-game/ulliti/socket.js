var onlineUsers = [];
var chatContent = [];
var roomChat = {};
var DATA = require('../ulliti/data.json');

module.exports = server => {
    const io = new require('socket.io')(server);
    io.on('connection', client => {
        let ID;
        // Chat
        client.on('chat', data => {        
            //console.log(data.Username, data.msg);
            chatContent.push(data);
            io.emit('chat', chatContent);
        });

        // Online list
        client.on('online', user => {            
            ID = user;
            onlineUsers.push(user);
            //console.log(user.Username, 1);
            
            //console.log(onlineUsers);
            io.emit('online', onlineUsers);
        })   
        DATA.forEach(d => {
            client.on(`${d.Host}`, u => {
                if (roomChat[`${d.Host}`]==undefined) roomChat[`${d.Host}`] = [];
                roomChat[`${d.Host}`].push(u);                                
                io.emit(`${d.Host}`, roomChat[`${d.Host}`]);
            })                    
        })

        client.on('disconnect', () => {
            onlineUsers = onlineUsers.filter(u => u !== ID);
        });
    })
}
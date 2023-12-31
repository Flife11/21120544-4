const {fetchFunction} = require('../ulliti/db');
const Game = require('../models/game.m');
const fs = require('fs');

const getImage = async (data) => {
    //console.log(data);
    if (data.Image!='Profile.png') {
        // console.log(data.Image, 22);
        const rs = await fetch('https://localhost:3003/get/Image', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Image": data.Image
            })
        });
        const img = await rs.json();
        //console.log(img, 1);
        //console.log(img, 'game');
        fs.writeFile(`./server-game/views/img/${data.Image}`, new Buffer(img.Image.data, ''), (err) => {
            console.log(err);
        })
    }
}

const ProductRender = async (req, res, next) => {
     try {        
        // Danh sách người chơi
        const rs1 = await fetchFunction('https://localhost:3003/get/all', {});
        const userList = await rs1.json();
        userList.Users.forEach(u => {            
            getImage(u);
        });
        
        // Nguời dùng hiện tại
        const rs2 = await fetchFunction('https://localhost:3003/login', {"username" :req.session.passport.user});
        const user = await rs2.json();        
        // Danh sách phong game
        const roomList = Game.GetAll();
        console.log(roomList);

        res.render('product', {
            pcss: () => 'css/productCSS',
            navbar: () => 'navbar',
            chatbox: () => 'chatbox',
            chatCSS: () => 'css/chatCSS',
            // userList: userList.Users,
            user: user,
            roomList: roomList,
            noti: 'Notice'
        })
     }
     catch(error) {
        next(error);
     }
    
}

module.exports = {
    ProductRender
}
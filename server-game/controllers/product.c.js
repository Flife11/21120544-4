const {fetchFunction} = require('../ulliti/db');
const fs = require('fs');

const getImage = async (data) => {
    if (!data.Image || (data.Image && data.Image.length==0)) {        
        data.Image = 'Profile.png';
    } else {
        //console.log(data.Image, 22);
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
        const rs1 = await fetchFunction('https://localhost:3003/get/all', {});
        const userList = await rs1.json();
        userList.Users.forEach(u => {
            //console.log(u);
            getImage(u);
        });
        // console.log(userList);
        const rs2 = await fetchFunction('https://localhost:3003/login', {"username" :req.session.passport.user});
        const user = await rs2.json();
        if (!user.Image || (user.Image && user.Image.length==0)) {        
            user.Image = 'Profile.png';
        }
        //console.log(user);
        res.render('product', {
            pcss: () => 'css/productCSS',
            navbar: () => 'navbar',
            chatbox: () => 'chatbox',
            chatCSS: () => 'css/chatCSS',
            userList: userList.Users,
            user: user
        })
     }
     catch(error) {
        next(error);
     }
    
}

module.exports = {
    ProductRender
}
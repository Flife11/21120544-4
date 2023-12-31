const { fetchFunction } = require('../ulliti/db');
const fs = require('fs');

const ProfileRender = async (req, res, next) => {
    try {
        //console.log(req.session.passport, req.session.passport.user)
        const rs = await fetchFunction('https://localhost:3003/get/profile', {
            "username": req.session.passport.user
        })
        const data = await rs.json();
        //console.log(data);
        if (!data.Image || (data.Image && data.Image.length==0)) {
            data.Image = 'Profile.png';
        } else {
            //console.log(data.Image);
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

        data.Username = data.Username || '';
        data.Nickname = data.Nickname || '';
        data.Name = data.Name || '';
        data.Image = data.Image || 'Profile.png';

        res.render('profile', {
            pcss: () => 'css/profileCSS',
            chatCSS: () => 'css/emptyCSS',
            user: data
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { ProfileRender }
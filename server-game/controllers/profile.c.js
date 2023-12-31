const { fetchFunction } = require('../ulliti/db');

const ProfileRender = async (req, res, next) => {
    try {
        console.log(req.session.passport, req.session.passport.user)
        const rs = await fetchFunction('https://localhost:3003/get/profile', {
            "username": req.session.passport.user
        })
        const data = await rs.json();
        console.log(data);

        res.render('profile', {
            pcss: () => 'css/profileCSS',
            chatCSS: () => 'css/emptyCSS',
            username: data.Username || '',
            Nickname: data.Nickname || '',
            Image: data.Image || 'Profile.png'
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { ProfileRender }
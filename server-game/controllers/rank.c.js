const {fetchFunction} = require('../ulliti/db');

const RankRender = async (req, res, next) => {      
    try {
        const rs1 = await fetchFunction('https://localhost:3003/get/all', {});
        const userList = await rs1.json();
        userList.Users = userList.Users.map((u, index) => {
            if (!u.Image || (u.Image && u.Image.length==0)) {        
                u.Image = 'Profile.png';
            }
            if (!u.Score || u.Score=='') u.Score = 0;
            u.Index = parseInt(index)+1;
            return u;
        })
        userList.Users.sort((a, b) => {
            if (a.Score==b.Score) return 0;
            if (a.Score>b.Score) return -1;
            else return 1;
        })
        console.log(userList.Users);
        res.render('rank', {
            pcss: () => 'css/rankCSS',
            chatCSS: () => 'css/emptyCSS',
            data: userList.Users
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {RankRender};

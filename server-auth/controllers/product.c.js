const User = require('../models/user.m');
const bcrypt = require('bcrypt');

const ProductRender = async (req, res, next) => {
    // try {
    //     // console.log(1, req.signedCookies.username)
    //     const username = req.signedCookies.username;
    //     const password = req.signedCookies.password; 

    //     if (req.session.remember==true) {
    //         res.render('product', {
    //             pcss: () => 'css/productCSS'
    //         })
    //         return;
    //     }
        
    //     if (username==undefined || password==undefined) {
    //         res.redirect("/login");
    //     } else {                                   
    //         const databaseUser = await User.checkLogin(new User(username, password))
            
    //         if ((!(databaseUser.Username==username && bcrypt.compare(password, databaseUser.Password)))) {
    //             console.log(req.session.remember==true, req.session.remember);
                            
    //         } else {
    //             res.render('product', {
    //                 pcss: () => 'css/productCSS'
    //             })
    //         }    
    //     }
                  
    // } catch (error) {
    //     next(error);
    // }
    
    // res.render('product', {
    //     pcss: () => 'css/productCSS'
    // })
    // console.log(req.isAuthenticated())
    res.render('product', {
        pcss: () => 'css/productCSS'
    })
}

module.exports = {
    ProductRender
}
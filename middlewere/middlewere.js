const jwt = require('jsonwebtoken');

const checkLoginToken = (req, res, next) => {

    let token = req.cookies.userToken;
    if (!token) {
        res.locals.user = null;
        res.locals.userId = false;

        next()
    } else {
        res.redirect('/')
    }
}

const checkHomeTkn = (req, res, next) => {
    let token = req.cookies.userToken;
    if (!token) {
        res.locals.user = null;
        res.locals.userId = false;

        next()
    } else {
        jwt.verify(token, process.env.JWT_TEXT, async (err, userInfo) => {


            if (err) {
                console.log(err)
            } else {

                res.locals.user = userInfo.infoForToken.userName;
                res.locals.email = userInfo.infoForToken.email;
                res.locals.userId = userInfo.infoForToken.id;
                next();
            }
        })
    }
}

const checkToken = (req, res, next) => {
    let token = req.cookies.userToken;
    if (token) {
        jwt.verify(token, process.env.JWT_TEXT, async (err, userInfo) => {
            if (err) {
                console.log(err)
            } else {
                res.locals.user = userInfo.infoForToken.userName;
                res.locals.email = userInfo.infoForToken.email;
                res.locals.userId = userInfo.infoForToken.id;
                next();
            }
        })
    } else {
        res.locals.user = false;
        res.redirect('/loginPage')
    }
}

module.exports = {
    checkHomeTkn,
    checkToken,
    checkLoginToken


}

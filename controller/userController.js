const userModel = require('../model/userModel');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getLoginPage = (req, res) => {
    res.render('logInPage', {error: " "})
}

const login = async (req, res) => {
//   //Check if this user is already in the DB.
    let existedUser = await userModel.findOne({email: req.body.email});
    if (!existedUser) {
        res.send('loginPage', {
            error: "user is not exist. So signup first please!",
            success: ""
        })
    } else {
        let isCorrectPass = bcrypt.compareSync(req.body.password, existedUser.password);
        if (!isCorrectPass) {
            res.send('loginPage', {
                error: "user password is not correct!",
                success: "",
                user : '',
                userId : ''
            })
        } else {
            let infoForToken = {
                id: existedUser._id,
                userName: existedUser.userName,
                email: existedUser.email
            }
            let userToken = jwt.sign({infoForToken}, process.env.JWT_TEXT);
            res.cookie("userToken", userToken, {httpOnly: true});

            res.redirect('/')
        }
    }
}

const getSignPage = (req, res) => {
    res.render('signupPage', {
        error: ''
    })
}
const getSignUpFunction = async (req, res) => {

    let existedUser = await userModel.findOne({email: req.body.email});


    if (existedUser) {
        res.send({
            error: "user is exist",
            success: "",
            user: '',
            userId:''
        })

    } else {
        let hashedPass = bcrypt.hashSync(req.body.password, 7)
        let userObj = {
            ...req.body,
            password: hashedPass
        }

        let newUser = new userModel(userObj);

        newUser.save()
            .then(() => {

            })
            .catch((err) => {
                throw err
            })
    }


}

const getQuestionPage = (req, res) => {
    res.render('questionPage', {error: ''})
}

const logOut = (req, res) => {
    res.clearCookie('userToken');
    res.redirect('/')
}

module.exports = {

    getLoginPage,
login,
    getSignPage,
    getQuestionPage,
    getSignUpFunction,
    logOut
}
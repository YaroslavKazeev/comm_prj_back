const express = require('express');
const postcontrl = require('../controller/postController');
const midle = require('../middlewere/middlewere');
const contrl = require('../controller/userController');

const route = express.Router();


route.get('/', midle.checkHomeTkn, postcontrl.getStartPage);
route.get('/loginPage', midle.checkLoginToken, contrl.getLoginPage)
route.post('/login', contrl.login)


route.get('/signupPage', midle.checkHomeTkn, contrl.getSignPage)
route.post('/signup', contrl.getSignUpFunction)

route.get('/edit_page/:id', postcontrl.getEditPage)

route.post('/editPost/:id', postcontrl.postEdited)

route.get('/delete/:id', postcontrl.deleteQuestion)

route.get('/questionPage', midle.checkToken, contrl.getQuestionPage)
route.post('/addNewQuestion/:id', midle.checkToken, postcontrl.addNewQuestion)
route.get('/fullPage/:id', midle.checkHomeTkn, postcontrl.getFullPage)

route.post('/addComment/:ownerId/:postId', midle.checkHomeTkn, postcontrl.addComment)
route.post('/deleteComment/:id', postcontrl.deleteComment)

route.get('/logout', contrl.logOut)


module.exports = route;
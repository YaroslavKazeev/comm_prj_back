const express = require('express')
const app = express();
const routes = require('./routes/routes');
require('./DataBase/mongoDB')
const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use('/public', express.static('public'));

app.use(express.urlencoded({extended: true}));


app.use(routes);
app.set('view engine', 'ejs');
app.use(express.json())

const Port = 5000;

app.listen(process.env.Port ?? Port, () => {
    console.log(`server on ${Port}`)
})

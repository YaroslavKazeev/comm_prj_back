const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGOOSE )
    .then(res => console.log('DB is Connected'))
    .catch(err => console.log(err))
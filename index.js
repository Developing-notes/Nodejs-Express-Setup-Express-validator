var express = require('express')
var app = express()
const bodyParser=require('body-parser')

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());


var routes1 = require('./routes/r_authroutes')
var mongoose = require('mongoose')
var dotenv = require('dotenv')
var cookieParser = require('cookie-parser')
dotenv.config(); //format
mongoose.connect(process.env.DB_Url,
    {
        useNewURLParser: true,
        useUnifiedTopology: true,
    },
    () =>   //method&mongoose calling
    {
        console.log('DB connected')
    })
app.use(cookieParser())
app.use(express.json());
// routes
app.use('/main', routes1)
app.listen(5000, () => {
    console.log('running successfully')
})

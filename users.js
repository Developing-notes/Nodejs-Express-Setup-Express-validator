//schema//
const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        min: 7,
        max: 15,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+   )*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 10

    }
})
module.exports = mongoose.model('user', userSchema)



const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    role: {
        type: String,
        enum: ['COLLABORATOR', 'USER'],
        default: 'USER'
    },
    picture: { type: String, default: '../public/images/defaultPP.jpg' },
    googleID: String,
}, {
    timestamps: true
})


module.exports = model("User", userSchema)

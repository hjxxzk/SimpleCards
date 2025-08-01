const mangoose = require('mongoose')

const userSchema = new mangoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mangoose.model('User', userSchema)

export default User;
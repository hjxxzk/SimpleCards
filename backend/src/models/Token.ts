const mangoose = require('mongoose')

const tokenSchema = new mangoose.Schema({
    token: {
        type: String,
        required: true,
    }
})

const Token = mangoose.model('Token', tokenSchema)

export default Token;
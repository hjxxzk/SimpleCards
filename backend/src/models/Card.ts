const mangoose = require('mongoose')

const cardSchema = new mangoose.Schema({
    word: {
        type: String,
        required: true,
    },
    translation: {
        type: String,
        required: true,
    },
    deck_id: {
        type: String,
        required: true,
    },
    isRemembered: {
        type: Boolean,
        required: true,
    }
})

const Card = mangoose.model('Card', cardSchema)

export default Card;
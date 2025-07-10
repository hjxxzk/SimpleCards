const mangoose = require('mongoose');

const deckSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    sourceLanguage: {
        type: String,
        required: false,
    },
    translationLanguage: {
        type: String,
        required: false,
    }
});

const Deck = mangoose.model('Deck', deckSchema);

export default Deck;
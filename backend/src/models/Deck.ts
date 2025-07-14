const mangoose = require('mongoose');

const deckSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sourceLanguage: {
        type: String,
        required: true,
    },
    translationLanguage: {
        type: String,
        required: true,
    }
});

const Deck = mangoose.model('Deck', deckSchema);

export default Deck;
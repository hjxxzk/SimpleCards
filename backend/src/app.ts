import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Deck from './models/Deck';
import cors from 'cors';

const DECKS = '/api/decks/';
const DELETE_DECK = '/api/decks/:id';

dotenv.config();
const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get(DECKS, async (req, res) => {
    try {
        const dane = await Deck.find();
        res.json(dane);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete(DELETE_DECK, async (req, res) => {
    const deckId = req.params.id;
    try {
        const deletedDeck = await Deck.findByIdAndDelete(deckId);
        if (!deletedDeck) {
            return res.status(404).json({ message: 'Deck not found' });
        }
        res.json({ message: 'Deck deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default app;
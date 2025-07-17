import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Deck from './models/Deck';
import Card from './models/Card'
import cors from 'cors';

const DECKS = '/api/decks/';
const DELETE_DECK = '/api/decks/:id';
const CARDS = '/api/cards/';
const DELETE_CARD = '/api/cards/:id';

dotenv.config();
const app = express();
app.use(express.json());
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
        const data = await Deck.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get(CARDS, async (req, res) => {
    try {
        const searchWord = req.query.search
        const data = await Card.find({ deck_id: searchWord });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post(CARDS, async (req, res) => {
    try {
        const newCard = new Card(req.body);
        const savedCard = await newCard.save();
        res.status(201).json({ id: savedCard._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.patch(CARDS + ':id', async (req, res) => {
    const cardId = req.params.id;
    const updatedCard = req.body.updatedCard;

    try {
        const card = await Card.findByIdAndUpdate(cardId, updatedCard, { new: true });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json({ message: "Card updated successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete(DELETE_CARD, async (req, res) => {
    const cardId = req.params.id;
    try {
        const deletedCard = await Card.findByIdAndDelete(cardId);
        if (!deletedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json({ message: 'Card deleted successfully' });
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

app.post(DECKS, async (req, res) => {
    try {
        const newDeck = new Deck(req.body);
        const savedDeck = await newDeck.save()
        res.status(201).json({ id: savedDeck._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default app;
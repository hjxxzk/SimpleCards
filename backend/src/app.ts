import express from 'express';
import mongoose from 'mongoose';
import Deck from './models/Deck';
import Card from './models/Card';
import User from './models/User';
import cors from 'cors';

const DECKS = '/api/decks/';
const DECK_BY_ID = '/api/decks/:id';
const CARDS = '/api/cards/';
const CARD_BY_ID = '/api/cards/:id';
const USERS = '/api/users';
const USERS_BY_NICKNAME = '/api/users/:nickname';
const LOGIN = '/api/users/login'

require('dotenv').config()
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post(USERS, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ nickname: req.body.nickname, password: hashedPassword });
        const savedUser = await newUser.save()
        res.status(201).json({ id: savedUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post(LOGIN, async (req, res) => {
    const user = await User.findOne({ nickname: req.body.nickname });
    if (user == null) {
        return res.status(400).json({ message: 'Cannot find user' });
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            return res.status(200).json({ message: 'Successfully authenticated' });
        } else {
            return res.status(404).json({ message: 'Credentials incorrect' });
        }
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get(USERS_BY_NICKNAME, async (req, res) => {
    try {
        const exists = await User.exists({ nickname: req.params.nickname });
        if (!exists) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json({ message: 'User exists' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


app.get(DECKS, async (req, res) => {
    try {
        const data = await Deck.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


app.get(DECK_BY_ID, async (req, res) => {
    try {
        const data = await Deck.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Deck not found' });
        } else {
            res.json(data);
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete(DECK_BY_ID, async (req, res) => {
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

app.patch(DECK_BY_ID, async (req, res) => {
    const deckId = req.params.id;
    const updatedDeck = req.body.updatedDeck;

    try {
        const deck = await Deck.findByIdAndUpdate(deckId, updatedDeck, { new: true });
        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' });
        }
        res.json({ message: "Deck updated successfully" });
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

app.delete(CARD_BY_ID, async (req, res) => {
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

export default app;
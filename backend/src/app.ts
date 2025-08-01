import express from 'express';
import mongoose from 'mongoose';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
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
const JWT = require('jsonwebtoken')
const SECRET_KEY: Secret = process.env.ACCESS_TOKEN_SECRET || "";

interface CustomRequest extends Request {
    id?: string;
    token?: any;
}

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
        const accessToken = JWT.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET);
        const refreshToken = JWT.sign({ id: savedUser._id }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.status(201).json({ accessToken: accessToken, refreshToken: refreshToken });
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
            const accessToken = generateAccessToken(user._id);
            const refreshToken = JWT.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            return res.status(404).json({ message: 'Credentials incorrect' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

function generateAccessToken(id: string) {
    return JWT.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

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

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Please authenticate' });;
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).id = (decoded as any).id;
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};

let refreshTokens: string[] = [];

app.post("/token", (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken == null) return res.status(401).json({ message: 'Not found' });
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ message: 'Not authorized' });
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: jwt.VerifyErrors | null, id: any) => {
        if (err) return res.status(403).json({ message: 'Not authorized' });
        console.log(id.id)
        // const accessToken = generateAccessToken(id.id);
        // return res.status(200).json({ accessToken: accessToken });
    })
})

app.get(DECKS, authenticate, async (req, res) => {
    const user_id = (req as CustomRequest).id;
    try {
        const data = await Deck.find({ "user_id": user_id });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


app.get(DECK_BY_ID, authenticate, async (req, res) => {
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

app.delete(DECK_BY_ID, authenticate, async (req, res) => {
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

app.post(DECKS, authenticate, async (req, res) => {
    try {
        const user_id = (req as CustomRequest).id;
        const { name, description, sourceLanguage, translationLanguage } = req.body;
        const newDeck = new Deck({
            name,
            description,
            sourceLanguage,
            translationLanguage,
            user_id
        }
        );
        const savedDeck = await newDeck.save()
        res.status(201).json({ id: savedDeck._id });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
});

app.patch(DECK_BY_ID, authenticate, async (req, res) => {
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

app.get(CARDS, authenticate, async (req, res) => {
    try {
        const searchWord = req.query.search
        const data = await Card.find({ deck_id: searchWord });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post(CARDS, authenticate, async (req, res) => {
    try {
        const newCard = new Card(req.body);
        const savedCard = await newCard.save();
        res.status(201).json({ id: savedCard._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.patch(CARDS + ':id', authenticate, async (req, res) => {
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

app.delete(CARD_BY_ID, authenticate, async (req, res) => {
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
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Deck from './models/Deck';
import cors from 'cors';

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

app.get('/api/decks', async (req, res) => {
    try {
        const dane = await Deck.find();
        res.json(dane);
    } catch (err) {
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

export default app;
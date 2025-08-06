import mongoose from 'mongoose';
import app from './app';

export const startServer = async () => {

    const PORT = process.env.PORT;

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        app.listen(PORT, () => {
            console.log('Server running on port 3000');
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

startServer();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Accept either MONGODB_URI or DATABASE_URL for flexibility
const MONGODB_URI = process.env.MONGODB_URI ?? process.env.DATABASE_URL;

if (!MONGODB_URI) {
    console.error('Missing MongoDB connection string. Please set MONGODB_URI (or DATABASE_URL) in server/.env or the environment.');
    // Exit with non-zero to signal failure instead of passing undefined to mongoose
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
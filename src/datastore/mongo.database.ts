import mongoose from 'mongoose';

export class MongoDatabase {
    private static instance: MongoDatabase;

    private constructor() {
        this.connect();
    }

    public static getInstance(): MongoDatabase {
        if (!MongoDatabase.instance) {
            MongoDatabase.instance = new MongoDatabase();
        }
        return MongoDatabase.instance;
    }

    private connect(): void {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/event-ticketing-system';
        mongoose.connect(mongoUri)
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('MongoDB connection error:', err));
    }
}
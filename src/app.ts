import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import eventRoutes from './routes/event.routes';
// import ticketRoutes from './routes/ticket.routes';
import { MongoDatabase} from "./datastore/mongo.database";

const app = express();
const port = process.env.PORT || 3000;

// Initialize database connection
MongoDatabase.getInstance();

app.use(bodyParser.json());
app.use('/events', eventRoutes);
// app.use('/tickets', ticketRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
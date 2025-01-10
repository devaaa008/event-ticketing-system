import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import eventRoutes from './api/routes/event.routes';
import ticketRoutes from './api/routes/ticket.routes';
import { MongoDatabase} from "./datastore/mongo.database";
import {startWorker} from "./workers/ticket.booking.workers";

const app = express();
const port = process.env.PORT || 3000;
async function startApp(){
    app.use(bodyParser.json());
    app.use('/events', eventRoutes);
    app.use('/tickets', ticketRoutes);

    MongoDatabase.getInstance();
    await startWorker()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startApp().catch(console.error)
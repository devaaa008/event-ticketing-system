import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import eventRoutes from './api/routes/event.routes';
import ticketRoutes from './api/routes/ticket.routes';
import { MongoDatabase} from "./datastore/mongo.database";
import {startWorker} from "./workers/ticket.booking.workers";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';


const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
const app = express();
const port = process.env.PORT || 3000;
async function startApp(){
    app.use(bodyParser.json());
    app.use('/events', eventRoutes);
    app.use('/tickets', ticketRoutes);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    MongoDatabase.getInstance();
    await startWorker()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startApp().catch(console.error)
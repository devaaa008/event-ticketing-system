import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import eventRoutes from './routes/event.routes';
// import ticketRoutes from './routes/ticket.routes';
import { MongoDatabase} from "./datastore/mongo.database";
import RabbitMQService from "./messagingqueue/rabbitmq.service";

const app = express();
const port = process.env.PORT || 3000;

// Initialize database connection
// MongoDatabase.getInstance();

app.use(bodyParser.json());
app.use('/events', eventRoutes);
// app.use('/tickets', ticketRoutes);


async function startApp(){
    MongoDatabase.getInstance();
    const rabbitMQService=RabbitMQService.getInstance()
    await rabbitMQService.connect();
    // await rabbitMQService.consumeMessages('ticket_purchases', async (msg:any) => {
    //     const { eventId, userId } = JSON.parse(msg.content.toString());
    //     try {
    //         // await ticketService.processTicketPurchase(eventId, userId);
    //         console.log(`Ticket purchased successfully for event ${eventId} by user ${userId}`);
    //     } catch (error:any) {
    //         console.error(`Error processing ticket purchase: ${error.message}`);
    //     }
    // });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}

startApp().catch(console.error)
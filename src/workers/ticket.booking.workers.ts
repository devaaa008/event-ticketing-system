import RabbitmqService from "../messagingqueue/rabbitmq.service";
// import TicketService from '../services/ticket.service';

const rabbitMQService = RabbitmqService.getInstance();
// const ticketService = new TicketService();

async function startWorker() {
    await rabbitMQService.connect();
    await rabbitMQService.consumeMessages('ticket_purchases', async (msg:any) => {
        const { eventId, userId } = JSON.parse(msg.content.toString());
        try {
            // await ticketService.processTicketPurchase(eventId, userId);
            console.log(`Ticket purchased successfully for event ${eventId} by user ${userId}`);
        } catch (error:any) {
            console.error(`Error processing ticket purchase: ${error.message}`);
        }
    });
}

startWorker().catch(console.error);
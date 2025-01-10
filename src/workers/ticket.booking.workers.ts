import RabbitmqService from "../messagingqueue/rabbitmq.service";
import {TicketService} from "../businessLogic/services/ticket.service";
import container from "../di/container";
import {ITicketService} from "../businessLogic/interfaces/ticket.service.interface";
import {ITicket} from "../businessLogic/models/ticket.model";

export async function startWorker() {
    const rabbitMQService = RabbitmqService.getInstance();
    const ticketService = container.get<ITicketService>(TicketService.name)
    await rabbitMQService.connect();
    await rabbitMQService.consumeMessages('ticket_purchases', async (msg:any) => {
        const ticketDetails:ITicket = JSON.parse(msg.content.toString());
        try {
            await ticketService.processTicketPurchase(ticketDetails);
            console.log(`ticket purchased successfully for event ${ticketDetails.eventId} by user ${ticketDetails.userId}`);
        } catch (error:any) {
            console.error(`Error processing ticket purchase: ${error.message}`);
        }
    });
}

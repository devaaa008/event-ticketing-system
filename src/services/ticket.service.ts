import { Types } from 'mongoose';
import Ticket from '../models/ticket.model';
import Event from '../models/event.model';
import RabbitMQService from '../messagingqueue/rabbitmq.service';

class TicketService {
    private rabbitMQService: RabbitMQService;

    constructor() {
        this.rabbitMQService = RabbitMQService.getInstance();
    }

    async purchaseTicket(eventId: string, userId: string) {
        await this.rabbitMQService.publishMessage('ticket_purchases', JSON.stringify({ eventId, userId }));
        return { message: 'Ticket purchase request received' };
    }

    async processTicketPurchase(eventId: string, userId: string) {
        const session = await Event.startSession();
        session.startTransaction();

        try {
            const event = await Event.findById(eventId).session(session);
            if (!event) {
                throw new Error('Event not found');
            }

            if (event.availableTickets <= 0) {
                throw new Error('No tickets available');
            }

            event.availableTickets -= 1;
            await event.save({ session });

            const ticket = new Ticket({
                event: eventId,
                user: userId,
                purchaseDate: new Date(),
            });
            await ticket.save({ session });

            await session.commitTransaction();
            return ticket;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    // ... (other methods remain the same)
}

export default TicketService;
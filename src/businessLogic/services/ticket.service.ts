import { Types } from 'mongoose';
import Ticket, {ITicket} from '../models/ticket.model';
import Event from '../models/event.model';
import RabbitMQService from '../../messagingqueue/rabbitmq.service';
import {injectable} from "inversify";
import {ITicketService} from "../interfaces/ticket.service.interface";

@injectable()
export class TicketService implements ITicketService{
    private rabbitMQService: RabbitMQService;

    constructor() {
        this.rabbitMQService = RabbitMQService.getInstance();
    }

    async purchaseTicket(ticketDetails: Partial<ITicket>) {
        const event = await Event.findById(ticketDetails.eventId)
        if (!event) {
            throw new Error('Event not found');
        }
        await this.rabbitMQService.publishMessage('ticket_purchases', JSON.stringify(ticketDetails));
        return { message: 'Ticket purchase request received' };
    }

    async processTicketPurchase(ticketDetails: ITicket) {
        const session = await Event.startSession();
        session.startTransaction();

        try {
            const event = await Event.findById(ticketDetails.eventId).session(session);
            if (!event) {
                throw new Error('Event not found');
            }

            if (event.availableTickets <= ticketDetails.noOfTickets) {
                throw new Error('No tickets available');
            }

            event.availableTickets -= ticketDetails.noOfTickets;
            await event.save({ session });

            const ticket = new Ticket({
                ...ticketDetails,
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

    async getReport(): Promise<{ totalTicketsSold: number; totalRevenue: number }> {
        const result = await Ticket.aggregate([
            {
                $lookup: {
                    from: 'events',
                    localField: 'eventId',
                    foreignField: '_id',
                    as: 'event'
                }
            },
            {
                $unwind: '$event'
            },
            {
                $group: {
                    _id: null,
                    totalTicketsSold: { $sum: '$noOfTickets' },
                    totalRevenue: { $sum: {$multiply: ['$noOfTickets', '$event.ticketPrice']} }
                }
            }
        ]);

        return result[0] || { totalTicketsSold: 0, totalRevenue: 0 };
    }

}
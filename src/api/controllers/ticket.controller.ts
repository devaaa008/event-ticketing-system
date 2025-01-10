import { Request, Response } from 'express';
import { TicketService } from '../../businessLogic/services/ticket.service';
import {inject, injectable} from "inversify";
import {ITicketService} from "../../businessLogic/interfaces/ticket.service.interface";

@injectable()
export class TicketController {

    constructor(@inject(TicketService.name) private ticketService: ITicketService) {
        this.ticketService = ticketService;
    }

    async purchaseTicket(req: Request, res: Response): Promise<void> {
        try {
            const {eventId, userId,noOfTickets} = req.body;
            if(!eventId || !userId || !noOfTickets) {
                res.status(401).json({ message: 'All fields are required(eventId, userId,noOfTickets)' });
            }
            const ticket = await this.ticketService.purchaseTicket({eventId, userId, noOfTickets});
            res.status(201).json(ticket);
        } catch (error :any) {
            res.status(400).json({ message: error.message });
        }
    }


    async getReport(req: Request, res: Response): Promise<void> {
        try {
            const report = await this.ticketService.getReport();
            res.json(report);
        } catch (error) {
            res.status(400).json({ message: 'Error generating report' });
        }
    }
}
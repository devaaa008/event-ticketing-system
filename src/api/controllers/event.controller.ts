import { Request, Response } from 'express';
import { EventService } from '../../businessLogic/services/event.service';
import {inject, injectable} from "inversify";
import {IEventService} from "../../businessLogic/interfaces/event.service.interface";
import {IEvent} from "../../businessLogic/models/event.model";

@injectable()
export class EventController {
    constructor(@inject(EventService.name) private eventService: IEventService) {
    }

    async createEvent(req: Request, res: Response): Promise<void> {
        try {
            const {name, date, totalTickets,availableTickets,ticketPrice}:IEvent = req.body;
            if(!name || !date || !totalTickets || !availableTickets|| !ticketPrice) {
                res.status(401).json({ message: 'All fields are required(name, date, totalTickets,availableTickets,ticketPrice)' });
            }
            const event = await this.eventService.createEvent(req.body);
            res.status(201).json(event);
        } catch (error) {
            res.status(400).json({ message: 'Error creating event' });
        }
    }

    async getEvent(req: Request, res: Response): Promise<void> {
        try {
            const eventId=req.params.id
            const event = await this.eventService.getEvent(req.params.id);
            if (event) {
                res.json(event);
            } else {
                res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error retrieving event' });
        }
    }

    async getAllEvents(req: Request, res: Response): Promise<void> {
        try {
            const events = await this.eventService.getAllEvents();
            res.json(events);
        } catch (error) {
            res.status(400).json({ message: 'Error retrieving events' });
        }
    }
}
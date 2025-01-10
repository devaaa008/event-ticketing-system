import Event, { IEvent } from '../models/event.model';
import {IEventService} from "../interfaces/event.service.interface";

export class EventService implements IEventService{
    async createEvent(eventData: Partial<IEvent>): Promise<IEvent> {
        const event = new Event(eventData);
        return await event.save();
    }

    async getEvent(eventId: string): Promise<IEvent | null> {
        return Event.findById(eventId);
    }

    async getAllEvents(): Promise<IEvent[]> {
        return Event.find();
    }
}
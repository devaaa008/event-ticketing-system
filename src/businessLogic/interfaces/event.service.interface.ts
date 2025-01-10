import {IEvent} from "../models/event.model";

export interface IEventService {
    createEvent(eventData: Partial<IEvent>): Promise<IEvent>
    getEvent(eventId: string): Promise<IEvent | null>
    getAllEvents(): Promise<IEvent[]>
}
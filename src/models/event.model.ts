import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
    name: string;
    date: Date;
    totalTickets: number;
    availableTickets: number;
    ticketPrice: number;
}

const EventSchema: Schema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    totalTickets: { type: Number, required: true },
    availableTickets: { type: Number, required: true },
    ticketPrice: { type: Number, required: true },
});

export default mongoose.model<IEvent>('Event', EventSchema);
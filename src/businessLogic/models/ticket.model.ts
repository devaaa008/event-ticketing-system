import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
    eventId: mongoose.Types.ObjectId;
    userId: string;
    noOfTickets: number;
    purchaseDate: Date;
}

const TicketSchema: Schema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type:Number, required: true },
    noOfTickets: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
});

export default mongoose.model<ITicket>('Ticket', TicketSchema);
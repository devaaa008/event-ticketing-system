import mongoose, { Document, Schema } from 'mongoose';

export interface ITicket extends Document {
    eventId: mongoose.Types.ObjectId;
    purchaseDate: Date;
}

const TicketSchema: Schema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    purchaseDate: { type: Date, default: Date.now },
});

export default mongoose.model<ITicket>('Ticket', TicketSchema);
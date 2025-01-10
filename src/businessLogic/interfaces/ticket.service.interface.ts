import {ITicket} from "../models/ticket.model";

export interface ITicketService {
    purchaseTicket(ticketDetails: Partial<ITicket>):Promise<{message:string}>
    processTicketPurchase(ticketRequest: ITicket):Promise<any>
    getReport(): Promise<{ totalTicketsSold: number; totalRevenue: number }>
}
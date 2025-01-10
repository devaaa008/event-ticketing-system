import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';
import container from "../../di/container";

const router = Router();
const ticketController = container.get<TicketController>(TicketController)

router.post('/purchase', ticketController.purchaseTicket.bind(ticketController));
router.get('/report', ticketController.getReport.bind(ticketController));

export default router;
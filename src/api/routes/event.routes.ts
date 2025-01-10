import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import container from "../../di/container";

const router = Router();
const eventController = container.get<EventController>(EventController)

router.post('/', eventController.createEvent.bind(eventController));
router.get('/:id', eventController.getEvent.bind(eventController));

router.get('/', eventController.getAllEvents.bind(eventController));

export default router;
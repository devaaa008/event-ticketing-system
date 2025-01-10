import {Container} from "inversify";
import {EventService} from "../businessLogic/services/event.service";
import {IEventService} from "../businessLogic/interfaces/event.service.interface";
import {EventController} from "../api/controllers/event.controller";
import {ITicketService} from "../businessLogic/interfaces/ticket.service.interface";
import {TicketService} from "../businessLogic/services/ticket.service";
import {TicketController} from "../api/controllers/ticket.controller";

const container = new Container();

container.bind<IEventService>(EventService.name).to(EventService)
container.bind<EventController>(EventController).toSelf()
container.bind<ITicketService>(TicketService.name).to(TicketService)
container.bind<TicketController>(TicketController).toSelf()
export default container;
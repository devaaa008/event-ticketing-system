import {Container} from "inversify";
import {EventService} from "../services/event.service";
import {IEventService} from "../interfaces/event.service.interface";
import {EventController} from "../controllers/event.controller";

const container = new Container();

container.bind<IEventService>(EventService.name).to(EventService)
container.bind<EventController>(EventController).toSelf()
export default container;
import { SessionController } from "../controller/session.controller";
import { SessionService } from "../service/session.service";

const sessionService = new SessionService();
const sessionController = new SessionController(sessionService);

export { sessionService, sessionController };

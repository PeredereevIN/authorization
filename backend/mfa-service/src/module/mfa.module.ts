import { MfaController } from "../controller/mfa.controller";
import { MfaService } from "../service/mfa.service";

const mfaService = new MfaService();
const mfaController = new MfaController(mfaService);

export { mfaService, mfaController };

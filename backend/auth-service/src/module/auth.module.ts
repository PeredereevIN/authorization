import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";

const authService = new AuthService();
const authController = new AuthController(authService);

export { authService, authController };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const database_1 = __importDefault(require("./database/database"));
const session_routes_1 = __importDefault(require("./router/session.routes"));
const jwt_strategy_1 = require("./common/strategies/jwt.strategy");
const app_config_1 = require("./configuration/app.config");
const http_config_1 = require("./configuration/http.config");
const passport_middleware_1 = __importDefault(require("./middleware/passport.middleware"));
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
const asyncHandler_middleware_1 = require("./middleware/asyncHandler.middleware");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const BASE_PATH = app_config_1.config.BASE_PATH;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: app_config_1.config.APP_ORIGIN,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(passport_middleware_1.default.initialize());
app.get("/", (0, asyncHandler_middleware_1.asyncHandler)(async (req, res, next) => {
    res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Hello Subscribers!!!",
    });
}));
app.use(`${BASE_PATH}/session`, jwt_strategy_1.authenticateJWT, session_routes_1.default);
app.use(errorHandler_middleware_1.errorHandler);
app.listen(app_config_1.config.PORT, async () => {
    console.log(`Server listening on port ${app_config_1.config.PORT} in ${app_config_1.config.NODE_ENV}`);
    await (0, database_1.default)();
});

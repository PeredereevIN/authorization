"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.setupJwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const catch_errors_util_1 = require("../utils/catch-errors.util");
const app_config_1 = require("../../configuration/app.config");
const passport_1 = __importDefault(require("passport"));
const user_module_1 = require("../../module/user.module");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
        (req) => {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                throw new catch_errors_util_1.UnauthorizedException("Unauthorized access token", "AUTH_TOKEN_NOT_FOUND" /* ErrorCode.AUTH_TOKEN_NOT_FOUND */);
            }
            return accessToken;
        },
    ]),
    secretOrKey: app_config_1.config.JWT.SECRET,
    audience: ["user"],
    algorithms: ["HS256"],
    passReqToCallback: true,
};
const setupJwtStrategy = (passport) => {
    passport.use(new passport_jwt_1.Strategy(options, async (req, payload, done) => {
        try {
            const user = await user_module_1.userService.findUserById(payload.userId);
            if (!user) {
                return done(null, false);
            }
            req.sessionId = payload.sessionId;
            return done(null, user);
        }
        catch (error) {
            return done(error, false);
        }
    }));
};
exports.setupJwtStrategy = setupJwtStrategy;
exports.authenticateJWT = passport_1.default.authenticate("jwt", { session: false });

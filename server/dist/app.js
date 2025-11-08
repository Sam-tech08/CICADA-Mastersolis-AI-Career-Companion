"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const applications_routes_1 = __importDefault(require("./routes/applications.routes"));
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Simple CORS middleware for local development. If you prefer the `cors` package,
// install it and replace this with `app.use(cors({ origin: true }))`.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
        return res.status(200).end();
    }
    next();
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/applications', applications_routes_1.default);
// Error handling (typed)
app.use((err, req, res, next) => {
    logger_1.logger.error((err === null || err === void 0 ? void 0 : err.stack) || err);
    res.status(500).send('Something broke!');
});
exports.default = app;

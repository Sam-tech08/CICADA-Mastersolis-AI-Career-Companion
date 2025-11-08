"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Accept either MONGODB_URI or DATABASE_URL for flexibility
const MONGODB_URI = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : process.env.DATABASE_URL;
if (!MONGODB_URI) {
    console.error('Missing MongoDB connection string. Please set MONGODB_URI (or DATABASE_URL) in server/.env or the environment.');
    // Exit with non-zero to signal failure instead of passing undefined to mongoose
    process.exit(1);
}
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

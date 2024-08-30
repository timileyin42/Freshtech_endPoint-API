"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
}
mongoose_1.default.connect(MONGO_URI, {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
app.use(express_1.default.json());
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
app.use('/api/auth', authRoutes_1.default);
app.use('/api', dashboardRoutes_1.default);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

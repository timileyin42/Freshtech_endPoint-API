"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
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
// Use morgan to log requests on the server
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to Freshtech API!');
});
// Import and organize routes
const express_2 = require("express");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const apiRouter = (0, express_2.Router)();
apiRouter.use('/auth', authRoutes_1.default);
apiRouter.use('/', dashboardRoutes_1.default);
app.use('/api', apiRouter);
// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error('An error occurred:', err);
    res.status(500).send('Internal Server Error');
});
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Global request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

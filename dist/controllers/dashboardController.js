"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.airtimeToCash = exports.getDashboard = void 0;
const User_1 = __importDefault(require("../models/User"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = yield User_1.default.findById(req.user.id);
        const transactions = yield Transaction_1.default.find({ userId: req.user.id });
        res.json({
            balance: user === null || user === void 0 ? void 0 : user.balance,
            transactions,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.getDashboard = getDashboard;
const airtimeToCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = yield User_1.default.findById(req.user.id);
        if (!user || user.balance < amount) {
            res.status(400).json({ message: 'Insufficient balance' });
            return;
        }
        user.balance -= amount;
        yield user.save();
        yield Transaction_1.default.create({
            userId: user._id,
            amount,
            type: 'debit',
            description: 'Airtime to cash conversion',
        });
        res.json({ message: 'Conversion successful', newBalance: user.balance });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.airtimeToCash = airtimeToCash;

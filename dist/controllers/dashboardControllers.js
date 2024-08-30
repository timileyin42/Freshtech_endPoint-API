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
exports.airtimeToCash = void 0;
const User_1 = __importDefault(require("../models/User"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const dashboardValidation_1 = require("../validations/dashboardValidation");
const airtimeToCash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = dashboardValidation_1.airtimeToCashSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    const { amount } = req.body;
    try {
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
            description: 'Airtime to cash conversion'
        });
        res.json({ message: 'Conversion successful', newBalance: user.balance });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.airtimeToCash = airtimeToCash;

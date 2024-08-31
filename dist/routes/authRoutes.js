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
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authValidation_1 = require("../validations/authValidation");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const User_1 = __importDefault(require("../models/User")); // import the User model
const router = (0, express_1.Router)();
// Add a GET route to handle GET requests
router.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select('username password'); // query the User model to fetch all users with username and password fields
        const loginDetails = users.map((user) => ({ username: user.username, password: user.password }));
        res.json(loginDetails);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching login details' });
    }
}));
// Keep the existing POST route
router.post('/login', (0, validationMiddleware_1.validate)(authValidation_1.loginSchema), authController_1.login);
exports.default = router;

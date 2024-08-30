"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authValidation_1 = require("../validations/authValidation");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = (0, express_1.Router)();
router.post('/login', (0, validationMiddleware_1.validate)(authValidation_1.loginSchema), authController_1.login);
exports.default = router;

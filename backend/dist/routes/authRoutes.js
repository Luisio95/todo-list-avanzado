"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const asyncHandlers_1 = require("../utils/asyncHandlers");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = express_1.default.Router();
router.post('/login', (0, asyncHandlers_1.asyncHandler)(authController_1.login));
router.post('/register', (0, asyncHandlers_1.asyncHandler)(authController_1.register));
router.get('/profile', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(authController_1.getUserProfile));
exports.default = router;

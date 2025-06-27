"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const asyncHandlers_1 = require("../utils/asyncHandlers");
const router = express_1.default.Router();
router.post('/tasks', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.createTask));
router.get('/tasks', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.getUserTasks));
router.put('/tasks/:taskId', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.updateTask));
router.delete('/tasks/:taskId', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.deleteTask));
exports.default = router;

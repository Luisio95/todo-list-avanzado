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
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operaciones con tareas
 */
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post('/tasks', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.createTask));
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/tasks', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.getUserTasks));
router.put('/tasks/:taskId', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.updateTask));
router.delete('/tasks/:taskId', (0, asyncHandlers_1.asyncHandler)(authMiddlewares_1.authMiddleware), (0, asyncHandlers_1.asyncHandler)(taskController_1.deleteTask));
exports.default = router;

import express from 'express';
import { createTask, getUserTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { asyncHandler } from '../utils/asyncHandlers';
const router = express.Router();
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

router.post('/tasks', asyncHandler(authMiddleware), asyncHandler(createTask));
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

router.get('/tasks', asyncHandler(authMiddleware), asyncHandler(getUserTasks));
router.put('/tasks/:taskId', asyncHandler(authMiddleware), asyncHandler(updateTask));
router.delete('/tasks/:taskId', asyncHandler(authMiddleware), asyncHandler(deleteTask));

export default router;

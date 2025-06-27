import api from "../utils/axiosInstance";
import type { TaskResponse  } from "../types/Interfaces";

// GET todas las tareas
export const getUserTasks = () => {
  return api.get<TaskResponse[]>('/api/tasks'); // Array de tareas
};

// POST nueva tarea
export const postTasks = (taskData: {
  title: string;
  description: string;
  completed?: boolean;
}) => {
  return api.post<TaskResponse>('/api/tasks', taskData); // Envía taskData en el body
};

// PUT actualizar tarea
export const updateTask = (taskId: number, taskData: {
  title?: string;
  description?: string;
  completed?: boolean;
}) => {
  return api.put<TaskResponse>(`/api/tasks/${taskId}`, taskData);
};

// DELETE tarea
export const deleteTask = (taskId: number) => {
  return api.delete(`/api/tasks/${taskId}`);
};
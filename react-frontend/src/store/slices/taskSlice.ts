import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserTasks, postTasks, updateTask, deleteTask } from "../../api/tasks";
import type { TaskResponse } from "../../types/Interfaces";

export interface Tarea {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface TaskState {
  tasks: TaskResponse[]; // o Tarea[] si prefieres
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

interface NewTaskData {
  title: string;
  description: string;
  completed?: boolean;
}

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserTasks();
      return response.data.reverse();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error al obtener las tareas"
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask", // Nombre único para esta acción
  async (taskData: NewTaskData, { rejectWithValue }) => {
    try {
      const response = await postTasks(taskData); // Asegúrate que postTasks acepte los datos
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error al crear la tarea");
    }
  }
);

export const _updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    {
      taskId,
      taskData,
    }: {
      taskId: number;
      taskData: {
        title?: string;
        description?: string;
        completed?: boolean;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateTask(taskId, taskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Error al actualizar la tarea"
      );
    }
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (taskId: number, { rejectWithValue }) => {
    try {
      await deleteTask(taskId);
      return taskId; // Devolvemos el ID para eliminarlo del estado
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error al eliminar la tarea');
    }
  }
);


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Casos para fetchTasks (GET)
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Casos para createTask (POST)
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // Agrega la nueva tarea
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Caso para updateTask
      .addCase(_updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(_updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(_updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Caso al removeTask
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// No exportamos acciones ya que no tenemos reducers
export default taskSlice.reducer;

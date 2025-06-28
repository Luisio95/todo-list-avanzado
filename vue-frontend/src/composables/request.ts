import axios from "axios";

export const login = async (username: string, password: string) => {
    try {
        const { data } = await axios.post("/auth/login", { username, password });
        return data
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const { data } = await axios.post("/auth/register", { username, email, password });
        return data
    } catch (error) {
        throw error;
    }
};

export const getUserTasks = async () => {
    try {
        const { data } = await axios.get("/api/tasks");
        return data.reverse()
    } catch (error) {
        throw error;
    }
};

export const postTasks = async (taskData: {
  title: string;
  description: string;
}) => {
  try {
    const { data } = await axios.post("/api/tasks", taskData);
    return data
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId: number, taskData: {
  title: string;
  description: string;
}) => {
  try {
    const { data } = await axios.put(`/api/tasks/${taskId}`, taskData);
    return data
  } catch (error) {
    throw error;
  }
};


export const deleteTask = async (taskId: number) => {
  try {
    const { data } = await axios.delete(`/api/tasks/${taskId}`);
    return data
  } catch (error) {
    throw error;
  }
}
import api from "../utils/axiosInstance";

export const registerUser = (username: string, email: string, password: string) => {
  return api.post("/auth/register", { username, email, password });
};

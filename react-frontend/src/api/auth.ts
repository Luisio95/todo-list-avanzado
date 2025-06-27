import api from "../utils/axiosInstance";
import type { LoginResponse, Registeresponse, UserProfileResponse } from "../types/Interfaces";

export const registerUser = (username: string, email: string, password: string) => {
  return api.post<Registeresponse>("/auth/register", { username, email, password });
};

export const login = (username: string, password: string) => {
  return api.post<LoginResponse>("/auth/login", { username, password });
};

export const getUserProfile = () => {
  return api.get<UserProfileResponse>('/auth/profile');
};
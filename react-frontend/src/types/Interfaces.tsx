export interface RegisterFormProps {
  onRegister: (username: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}
export interface Registeresponse {
  message: String;
  user: {
    id: Number;
    username: String;
    password: String;
    email: String;
    updatedAt: String;
    createdAt: String;
  };
}

export interface LoginFromProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
}
export interface LoginResponse {
  token: string;
}

export interface UserProfileResponse {
  email: string;
  username: string;
}
export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
export interface RegisterFormProps {
  onRegister: (username: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

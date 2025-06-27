import { useState } from 'react';
import LoginForm from '../components/login/LoginForm';
import RegisterForm from '../components/login/RegisterForm';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);
  const toast = useRef<Toast>(null);

  const handleLogin = async (email: string, password: string) => {
    // Aquí iría tu llamada al backend /auth/login
    toast.current?.show({ severity: 'info', summary: 'Login', detail: `Email: ${email}` });
  };

  const handleRegister = async (email: string, password: string) => {
    // Aquí iría tu llamada al backend /auth/register
    toast.current?.show({ severity: 'success', summary: 'Registro', detail: `Usuario registrado: ${email}` });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Toast ref={toast} />
      {showRegister ? (
        <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
}

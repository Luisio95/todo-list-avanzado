import { useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "./useLoginForm";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { login } from "../../api/auth"; 
import type { LoginFromProps } from "../../types/Interfaces";
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { setCredentials } from '../../store/slices/authSlice';

export default function LoginForm({ onLogin, onSwitchToRegister }: LoginFromProps) {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, isValid } = useLoginForm(onLogin);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) {
      showErrorToast(toast, "Usuario y contraseña son requeridos");
      return;
    }

    try {
        const response = await login(email, password);
        dispatch(setCredentials({
          token: response.data.token,
          email: email
        }));
        showSuccessToast(toast, "¡Bienvenido!");
        onLogin(email, password);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } catch (error: any) {
        const message = error.response?.data?.message || "Error al hacer login";
        showErrorToast(toast, message);
      }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <Card style={{ maxWidth: "400px", width: "100%" }}>
          <div className="text-center mb-4">
            <img src="/logosvg.svg" alt="Logo" className="w-50" />
            <h2 className="mt-3">Iniciar Sesión</h2>
          </div>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <FloatLabel className="mt-3">
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-100"
              />
              <label htmlFor="email">Usuario</label>
            </FloatLabel>

            <FloatLabel className="mt-3">
              <Password
                id="password"
                toggleMask
                feedback={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Contraseña</label>
            </FloatLabel>

            <Button label="Iniciar sesión" icon="pi pi-sign-in" type="submit" className="w-100" raised />
            <Button label="Crear cuenta" link onClick={onSwitchToRegister} className="w-100 p-0" />
          </form>
        </Card>
      </div>
    </>
  );
}

import { useRef } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { useNavigate } from "react-router-dom";

import { useLoginForm } from "./useLoginForm";
import { isEmailValid } from "./Validators";
import { showErrorToast } from "../../utils/toastUtils";

interface Props {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onLogin, onSwitchToRegister }: Props) {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, isValid } = useLoginForm(onLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) {
      showErrorToast(toast, "Usuario y contraseña son requeridos");
      return;
    }

    if (!isEmailValid(email)) {
      showErrorToast(toast, "El correo electrónico no es válido");
      return;
    }

    onLogin(email, password);
    navigate("/dashboard");
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
              <label htmlFor="email">Email</label>
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

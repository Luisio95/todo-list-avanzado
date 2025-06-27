import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { registerUser } from "../../api/auth"; 
import type { RegisterFormProps } from "../../types/Interfaces";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

export default function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useRef<Toast>(null);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!fullName || !email || !password || !confirmPassword) {
    showErrorToast(toast, "Todos los campos son obligatorios");
    return;
  }

  if (password !== confirmPassword) {
    showErrorToast(toast, "Las contraseñas no coinciden");
    return;
  }

  try {
    await registerUser(fullName, email, password);
    showSuccessToast(toast, "Cuenta creada exitosamente");
    onRegister(fullName, email, password);
    onSwitchToLogin();
  } catch (error: any) {
    const message = error.response?.data?.message || "Error al registrar usuario";
    showErrorToast(toast, message);
  }
};

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Toast ref={toast} />
      <Card style={{ maxWidth: "600px", width: "100%" }}>
        <div className="text-center mb-4">
          <img src="/logosvg.svg" alt="Logo" className="w-50" />
          <h2 className="mt-3">Crear Cuenta</h2>
        </div>

        <form onSubmit={handleSubmit} className="container">
          <div className="row g-3">
            <div className="col-md-6">
              <FloatLabel className="mt-3">
                <InputText
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-100"
                />
                <label htmlFor="fullName">Nombre de usuario</label>
              </FloatLabel>
            </div>

            <div className="col-md-6">
              <FloatLabel className="mt-3">
                <InputText
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-100"
                />
                <label htmlFor="email">Correo</label>
              </FloatLabel>
            </div>

            <div className="col-md-6">
              <FloatLabel className="mt-3">
                <Password
                  id="password"
                  toggleMask
                  feedback={false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-100"
                />
                <label htmlFor="password">Contraseña</label>
              </FloatLabel>
            </div>

            <div className="col-md-6">
              <FloatLabel className="mt-3">
                <Password
                  id="confirmPassword"
                  toggleMask
                  feedback={false}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-100"
                />
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
              </FloatLabel>
            </div>

            <div className="col-12 d-grid gap-2 mt-3">
              <Button
                label="Registrarse"
                icon="pi pi-user-plus"
                type="submit"
                className="w-100"
                raised
              />
              <Button
                label="Ya tengo cuenta"
                link
                onClick={onSwitchToLogin}
                className="w-100 p-0"
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

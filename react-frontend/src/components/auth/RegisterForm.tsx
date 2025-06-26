import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { Message } from "primereact/message";

interface Props {
  onRegister: (
    username: string,
    email: string,
    password: string
  ) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onRegister, onSwitchToLogin }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    onRegister(fullName, email, password);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card style={{ maxWidth: "600px", width: "100%" }}>
        <div className="text-center mb-4">
          <img src="/logosvg.svg" alt="Logo" className="w-50" />
          <h2 className="mt-3">Crear Cuenta</h2>
        </div>

        <form onSubmit={handleSubmit} className="container">
          <div className="row g-3">
            <div className="col-md-6">
              <FloatLabel>
                <InputText
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-100"
                />
                <label htmlFor="fullName">Nombre completo</label>
              </FloatLabel>
            </div>

            <div className="col-md-6">
              <FloatLabel>
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
              <FloatLabel>
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
              <FloatLabel>
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

            {error && (
              <div className="col-12">
                <Message severity="error" text={error} />
              </div>
            )}

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

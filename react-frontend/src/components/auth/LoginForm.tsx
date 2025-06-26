import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { useNavigate } from "react-router-dom"; // ⬅️ Importa el hook

interface Props {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onLogin, onSwitchToRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ⬅️ Inicializa el hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías validar campos si lo deseas
    if (email.trim() && password.trim()) {
      onLogin(email, password); // aún llamamos al callback por si se usa
      navigate("/dashboard"); // ⬅️ Redirige al dashboard
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <img src="/logosvg.svg" alt="Logo" className="w-50" />
          <h2 className="mt-3">Iniciar Sesión</h2>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <FloatLabel>
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

          <Button
            label="Iniciar sesión"
            icon="pi pi-sign-in"
            type="submit"
            className="w-100"
            raised
          />
          <Button
            label="Crear cuenta"
            link
            onClick={onSwitchToRegister}
            className="w-100 p-0"
          />
        </form>
      </Card>
    </div>
  );
}

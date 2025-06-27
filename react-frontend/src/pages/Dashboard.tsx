import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import TaskTable from "../components/table/TaskTable";
import { getUserProfile } from "../api/auth";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";

export default function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<{
    email: string;
    username: string;
  } | null>(null);

  useEffect(() => {
    getUserProfile()
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error al obtener perfil", err));
  }, []);

  if (!profile) return <p>Cargando...</p>;

    const handleLogoutConfirm = () => {
    confirmDialog({
      message: "¿Estás seguro de que deseas cerrar sesión?",
      header: "Confirmar cierre de sesión",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-danger",
      accept: () => {
        localStorage.clear();
        navigate("/");
      },
    });
  };

  return (
    <div>
      <ConfirmDialog /> 
      <div className="layout">
        <header className="header">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <img src="/logosvg.svg" alt="Logo" style={{ width: "10vw" }} />
              <h4 className="mb-0">¡Bienvenido, {profile.username}!</h4>
              <Button
                icon="pi pi-sign-out"
                className="p-button-danger"
                onClick={handleLogoutConfirm}
              />
            </div>
          </div>
        </header>

        <aside className="sidebar">{/* menú lateral */}</aside>

        <main className="content">
          <div className="dashboard">
            <Card className="m-4">
              <TaskTable />
            </Card>

            <div className="text-center mt-4">
              <span className="app-name">Versión 1.0.1</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import TaskTable from "../components/table/TaskTable";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="layout">
        <header className="header">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <img src="/logosvg.svg" alt="Logo" style={{ width: "10vw" }} />
              <Button
                icon="pi pi-sign-out"
                className="p-button-danger"
                onClick={handleLogout}
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

import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: "pendiente" | "completada";
}

const estados = [
  { label: "Pendiente", value: "pendiente" },
  { label: "Completada", value: "completada" },
];

export default function TaskTable() {
  const [filtro, setFiltro] = useState("");
  const [tareas, setTareas] = useState<Tarea[]>([
    {
      id: 1,
      titulo: "Preparar reporte mensual",
      descripcion: "Consolidar los datos de ventas de junio.",
      fecha: "2025-06-25",
      estado: "pendiente",
    },
    {
      id: 2,
      titulo: "Enviar facturas",
      descripcion: "Enviar facturas pendientes a los clientes.",
      fecha: "2025-06-24",
      estado: "completada",
    },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(
    null
  );

  // Filtrar tareas por título, descripción o estado
  const tareasFiltradas = tareas.filter((tarea) =>
    [tarea.titulo, tarea.descripcion, tarea.estado]
      .join(" ")
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  // Cambiar estado pendiente/completada
  const toggleEstado = (id: number) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              estado: t.estado === "completada" ? "pendiente" : "completada",
            }
          : t
      )
    );
  };

  // Abrir modal para editar tarea
  const editarTarea = (tarea: Tarea) => {
    setTareaSeleccionada({ ...tarea }); // crear copia para edición
    setMostrarModal(true);
  };

  // Eliminar tarea con confirmación
const eliminarTarea = (id: number) => {
  const tarea = tareas.find((t) => t.id === id);
  confirmDialog({
    message: `¿Estás seguro de eliminar la tarea "${tarea?.titulo}"?`,
    header: "Confirmar eliminación",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Sí",
    rejectLabel: "No",
    acceptClassName: "p-button-primary",
    accept: () => {
      setTareas((prev) => prev.filter((t) => t.id !== id));
    },
  });
};


  // Abrir modal para nueva tarea
  const nuevaTarea = () => {
    setTareaSeleccionada({
      id: 0,
      titulo: "",
      descripcion: "",
      fecha: new Date().toISOString().split("T")[0], // fecha hoy YYYY-MM-DD
      estado: "pendiente",
    });
    setMostrarModal(true);
  };

  // Guardar tarea (crear o actualizar)
  const guardarTarea = () => {
    if (!tareaSeleccionada) return;

    if (!tareaSeleccionada.titulo.trim()) {
      alert("El título es obligatorio.");
      return;
    }

    if (tareaSeleccionada.id === 0) {
      // Crear nueva tarea
      const nuevaId = tareas.length
        ? Math.max(...tareas.map((t) => t.id)) + 1
        : 1;
      setTareas((prev) => [...prev, { ...tareaSeleccionada, id: nuevaId }]);
    } else {
      // Actualizar tarea existente
      setTareas((prev) =>
        prev.map((t) => (t.id === tareaSeleccionada.id ? tareaSeleccionada : t))
      );
    }
    setMostrarModal(false);
    setTareaSeleccionada(null);
  };

  const estadoTemplate = (rowData: Tarea) => (
    <Tag
      value={rowData.estado}
      severity={rowData.estado === "completada" ? "success" : "warning"}
    />
  );

  const accionesTemplate = (rowData: Tarea) => (
    <div className="d-flex gap-2 justify-content-center">
      <Button
        raised
        icon={rowData.estado === "completada" ? "pi pi-undo" : "pi pi-check"}
        className={`p-button-rounded ${
          rowData.estado === "completada" ? "p-button" : "p-button"
        }`}
        onClick={() => toggleEstado(rowData.id)}
        tooltip={
          rowData.estado === "completada"
            ? "Marcar como pendiente"
            : "Marcar como completada"
        }
        tooltipOptions={{ position: "top" }}
        size="small"
      />
      <Button
        raised
        icon="pi pi-pencil"
        className="p-button-rounded"
        onClick={() => editarTarea(rowData)}
        tooltip="Editar tarea"
        tooltipOptions={{ position: "top" }}
        size="small"
      />
      <Button
        raised
        icon="pi pi-trash"
        className="p-button-rounded"
        onClick={() => eliminarTarea(rowData.id)}
        tooltip="Eliminar tarea"
        tooltipOptions={{ position: "top" }}
        size="small"
      />
    </div>
  );

  const header = (
    <div className="d-flex d-flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">
        <i className="pi pi-table mx-2"></i> Listado de tareas
      </span>
    </div>
  );

  const footer = `En total hay ${tareas ? tareas.length : 0} tareas`;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0"></h1>
        <Button
          label="Crear nueva tarea"
          icon="pi pi-plus"
          className="p-button-primary"
          onClick={nuevaTarea}
          raised
        />
      </div>
      <div className="mb-3 flex justify-content-between align-items-center">
        <FloatLabel>
          <InputText
            id="filtro"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-50"
          />
          <label htmlFor="filtro">Buscar tarea...</label>
        </FloatLabel>
      </div>

      <DataTable
        value={tareasFiltradas}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 15, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} tareas"
        totalRecords={tareasFiltradas.length}
        responsiveLayout="scroll"
        header={header}
        footer={footer}
        stripedRows
        showGridlines
        emptyMessage="No hay tareas."
      >
        <Column field="titulo" header="Título" sortable />
        <Column field="descripcion" header="Descripción" />
        <Column field="fecha" header="Fecha" sortable />
        <Column field="estado" header="Estado" body={estadoTemplate} sortable />
        <Column
          header="Acciones"
          body={accionesTemplate}
          style={{ width: "160px" }}
        />
      </DataTable>

      <Dialog
        header={tareaSeleccionada?.id === 0 ? "Nueva Tarea" : "Editar Tarea"}
        visible={mostrarModal}
        style={{ width: "50vw" }}
        modal
        onHide={() => setMostrarModal(false)}
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={() => setMostrarModal(false)}
            />
            <Button
              label="Guardar"
              icon="pi pi-check"
              onClick={guardarTarea}
              autoFocus
            />
          </div>
        }
      >
        <div
          className="p-fluid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <FloatLabel className="mt-4">
            <InputText
              id="titulo"
              value={tareaSeleccionada?.titulo || ""}
              onChange={(e) =>
                setTareaSeleccionada((prev) =>
                  prev ? { ...prev, titulo: e.target.value } : prev
                )
              }
              className="w-100"
            />
            <label htmlFor="titulo">Título</label>
          </FloatLabel>

          <FloatLabel className="mt-4">
            <InputText
              id="descripcion"
              value={tareaSeleccionada?.descripcion || ""}
              onChange={(e) =>
                setTareaSeleccionada((prev) =>
                  prev ? { ...prev, descripcion: e.target.value } : prev
                )
              }
              className="w-100"
            />
            <label htmlFor="descripcion">Descripción</label>
          </FloatLabel>

          <FloatLabel className="mt-4">
            <Calendar
              id="fecha"
              value={
                tareaSeleccionada?.fecha
                  ? new Date(tareaSeleccionada.fecha)
                  : null
              }
              onChange={(e) =>
                setTareaSeleccionada((prev) =>
                  prev && e.value
                    ? {
                        ...prev,
                        fecha: (e.value as Date).toISOString().split("T")[0],
                      }
                    : prev
                )
              }
              dateFormat="yy-mm-dd"
              showIcon
              className="w-100"
            />
            <label htmlFor="fecha">Fecha</label>
          </FloatLabel>

          <FloatLabel className="mt-4">
            <Dropdown
              id="estado"
              value={tareaSeleccionada?.estado}
              options={estados}
              onChange={(e) =>
                setTareaSeleccionada((prev) =>
                  prev ? { ...prev, estado: e.value } : prev
                )
              }
              className="w-100"
            />
            <label htmlFor="estado">Estado</label>
          </FloatLabel>
        </div>
      </Dialog>
      <ConfirmDialog />
    </div>
  );
}

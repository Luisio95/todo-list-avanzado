import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  _updateTask,
  removeTask,
} from "../../store/slices/taskSlice";
import type { AppDispatch, RootState } from "../../store/index";
import { InputTextarea } from "primereact/inputtextarea";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { Toast } from "primereact/toast";

interface TareaUI {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export default function TaskTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const [filtro, setFiltro] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<TareaUI | null>(
    null
  );
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Cargar tareas al montar el componente
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Filtrar tareas por título, descripción o estado
  const tareasFiltradas = tasks.filter((tarea) =>
    [
      tarea.title,
      tarea.description,
      tarea.completed ? "completada" : "pendiente",
    ]
      .join(" ")
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  // Cambiar estado pendiente/completada
  const toggleEstado = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      try {
        await dispatch(
          _updateTask({
            taskId: id,
            taskData: { completed: !task.completed },
          })
        ).unwrap();
        showSuccessToast(toast, "Tarea actualizada corrrectamente.");
      } catch (error) {
        console.error("Error al cambiar estado:", error);
      }
    }
  };

  // Abrir modal para editar tarea
  const editarTarea = (tarea: TareaUI) => {
    setTareaSeleccionada({ ...tarea }); // crear copia para edición
    setMostrarModal(true);
  };

  // Eliminar tarea con confirmación
  const eliminarTarea = (id: number) => {
    const tarea = tasks.find((t) => t.id === id);
    confirmDialog({
      message: `¿Estás seguro de eliminar la tarea "${tarea?.title}"?`,
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await dispatch(removeTask(id)).unwrap();
          showSuccessToast(toast, "Tarea eliminada correctamente.");
          dispatch(fetchTasks());
        } catch (error) {
          showErrorToast(toast, "Error al eliminar la tarea");
        }
      },
    });
  };

  // Abrir modal para nueva tarea
  const nuevaTarea = () => {
    setTareaSeleccionada({
      id: 0,
      title: "",
      description: "",
      completed: false,
      userId: 0, // Esto lo debería establecer el backend
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setMostrarModal(true);
  };

  // Guardar tarea (crear o actualizar)
  const guardarTarea = async () => {
    if (!tareaSeleccionada) return;

    if (
      !tareaSeleccionada.title.trim() ||
      !tareaSeleccionada.description.trim()
    ) {
      showErrorToast(toast, "Todos los campos son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      if (tareaSeleccionada.id === 0) {
        // Crear nueva tarea
        const taskData = {
          title: tareaSeleccionada.title,
          description: tareaSeleccionada.description,
          completed: tareaSeleccionada.completed || false,
        };

        // Dispatch la acción createTask y espera a que se complete
        await dispatch(createTask(taskData)).unwrap();
        showSuccessToast(toast, "Tarea creada correctamente.");
        setMostrarModal(false);
      } else {
        // Actualizar tarea existente
        const taskData = {
          title: tareaSeleccionada.title,
          description: tareaSeleccionada.description,
          completed: tareaSeleccionada.completed,
        };
        await dispatch(
          _updateTask({
            taskId: tareaSeleccionada.id,
            taskData,
          })
        ).unwrap();
        setTareaSeleccionada(null);
        showSuccessToast(toast, "Tarea actualizada correctamente.");
        setMostrarModal(false);
      }
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      showErrorToast(toast, "Error al guardar la tarea");
    }
    dispatch(fetchTasks());
    setLoading(false);
  };

  // Template para mostrar el estado
  const estadoTemplate = (task: { completed: boolean }) => (
    <Tag
      value={task.completed ? "Completada" : "Pendiente"}
      severity={task.completed ? "success" : "warning"}
    />
  );

  const accionesTemplate = (rowData: TareaUI) => (
    <div className="d-flex gap-2 justify-content-center">
      <Button
        raised
        icon={rowData.completed === true ? "pi pi-undo" : "pi pi-check"}
        className={`p-button-rounded ${
          rowData.completed === true ? "p-button" : "p-button"
        }`}
        onClick={() => toggleEstado(rowData.id)}
        tooltip={
          rowData.completed === true
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

  const footer = `En total hay ${tasks ? tasks.length : 0} tareas`;

  return (
    <div>
      <Toast ref={toast} />
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
            className="w-100"
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
        <Column field="title" header="Título" sortable />
        <Column field="description" header="Descripción" />
        <Column
          field="createdAt"
          header="Fecha de alta"
          body={(rowData) => formatDate(rowData.createdAt)}
          sortable
        />
        <Column
          field="updatedAt"
          header="Fecha de actualizacón"
          body={(rowData) => formatDate(rowData.createdAt)}
          sortable
        />
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
              loading={loading}
            />
          </div>
        }
      >
        <div className="p-fluid grid mt-4">
          {/* Primera fila - Título */}
          <div className="col-12">
            <FloatLabel className="mt-4">
              <InputText
                id="title"
                value={tareaSeleccionada?.title || ""}
                onChange={(e) =>
                  setTareaSeleccionada((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev
                  )
                }
                className="w-100"
              />
              <label htmlFor="title">Título</label>
            </FloatLabel>
          </div>

          {/* Segunda fila - Descripción */}
          <div className="col-12 mt-3">
            <FloatLabel className="mt-4">
              <InputTextarea
                id="description"
                value={tareaSeleccionada?.description || ""}
                onChange={(e) =>
                  setTareaSeleccionada((prev) =>
                    prev ? { ...prev, description: e.target.value } : prev
                  )
                }
                className="w-100"
                rows={5}
                autoResize
              />
              <label htmlFor="description">Descripción</label>
            </FloatLabel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

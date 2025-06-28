<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="mb-0">Lista de Tareas</h1>
      <Button
        label="Crear nueva tarea"
        icon="pi pi-plus"
        class="p-button-primary"
        @click="abrirModalCreacion"
        raised
      />
    </div>

    <div class="mb-3 flex justify-content-between align-items-center">
      <InputText v-model="filtro" placeholder="Buscar tarea" class="w-50" />
    </div>

    <DataTable
      :value="tareasFiltradas"
      :paginator="true"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      responsiveLayout="scroll"
    >
      <Column field="title" header="Título" :sortable="true"></Column>
      <Column field="description" header="Descripción" :sortable="true"></Column>
      <Column field="createdAt" header="Fecha de alta" :sortable="true"></Column>
      <Column field="updatedAt" header="Fecha de actualización" :sortable="true"></Column>
      <Column field="completed" header="Estado" :sortable="true">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.completed ? 'Completada' : 'Pendiente'"
            :severity="slotProps.data.completed ? 'success' : 'danger'"
          />
        </template>
      </Column>
      <Column header="Acciones" :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mx-2"
            @click="abrirModalEdicion(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-danger mx-2"
            @click="confirmarEliminar(slotProps.data)"
          />
          <Button
            :icon="slotProps.data.completed ? 'pi pi-times' : 'pi pi-check'"
            :class="slotProps.data.completed ? 'p-button-rounded p-button-warning mx-2' : 'p-button-rounded p-button-success mx-2'"
            @click="cambiarEstadoTarea(slotProps.data)"
            :title="slotProps.data.completed ? 'Marcar como pendiente' : 'Marcar como completada'"
          />
        </template>
      </Column>
    </DataTable>

    <!-- Diálogo para confirmar eliminación -->
    <Dialog
      v-model:visible="displayDeleteDialog"
      :style="{ width: '450px' }"
      header="Confirmar eliminación"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>¿Estás seguro de que quieres eliminar la tarea <b>{{ tareaSeleccionada?.title }}</b>?</span>
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          @click="displayDeleteDialog = false"
          class="p-button-text"
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          @click="eliminarTarea"
          class="p-button-danger"
          :loading="loading"
        />
      </template>
    </Dialog>

    <!-- Diálogo para crear/editar tarea -->
    <Dialog
      v-model:visible="displayTaskDialog"
      :style="{ width: '370px' }"
      :header="modalTitle"
      :modal="true"
    >
      <div class="p-fluid">
        <div class="field">
          <div class="row">
            <div class="col-12">
              <div class="d-flex-column gap-2">
                <label for="titulo">Título</label><br>
                <InputText
                  id="titulo"
                  v-model="tareaForm.title"
                  required
                  autofocus
                  :class="{ 'p-invalid': submitted && !tareaForm.title }"
                />
                <small class="p-error" v-if="submitted && !tareaForm.title">
                  El título es requerido
                </small>
              </div>
            </div>
            <div class="col-12">
              <div class="field">
                <label for="descripcion">Descripción</label><br>
                <Textarea
                  id="descripcion"
                  v-model="tareaForm.description"
                  rows="5"
                  autoResize
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          @click="cerrarDialogoTarea"
          class="p-button-text"
        />
        <Button
          :label="isEditing ? 'Actualizar' : 'Guardar'"
          icon="pi pi-check"
          @click="guardarTarea"
          class="p-button-primary"
          :loading="loading"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";
import { toast } from "vue3-toastify";
import { getUserTasks, postTasks, updateTask, deleteTask } from "../composables/request";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/task";
const {
    tareas
} = storeToRefs(useTaskStore());

const filtro = ref("");
const displayTaskDialog = ref(false);
const displayDeleteDialog = ref(false);
const tareaSeleccionada = ref(null);
const loading = ref(false);
const submitted = ref(false);
const isEditing = ref(false);
const modalTitle = ref("Nueva Tarea");

const tareaForm = ref({
  id: null,
  title: "",
  description: "",
  completed: false
});

onMounted(async () => {
  await cargarTareas();
});

const cargarTareas = async () => {
  try {
    const response = await getUserTasks();
    tareas.value = response;
  } catch (error) {
    toast.error("Error al cargar las tareas");
    console.error("Error al obtener tareas:", error);
  }
};

// Función para abrir el modal de creación
const abrirModalCreacion = () => {
  isEditing.value = false;
  modalTitle.value = "Nueva Tarea";
  tareaForm.value = { id: null, title: "", description: "", completed: false };
  submitted.value = false;
  displayTaskDialog.value = true;
};

// Función para abrir el modal de edición
const abrirModalEdicion = (tarea) => {
  isEditing.value = true;
  modalTitle.value = "Editar Tarea";
  tareaForm.value = { 
    id: tarea.id,
    title: tarea.title,
    description: tarea.description,
    completed: tarea.completed
  };
  submitted.value = false;
  displayTaskDialog.value = true;
};

// Función para cerrar el diálogo
const cerrarDialogoTarea = () => {
  displayTaskDialog.value = false;
  submitted.value = false;
};

// Función para guardar/actualizar la tarea
const guardarTarea = async () => {
  submitted.value = true;

  if (!tareaForm.value.title) {
    toast.warning("El título es requerido");
    return;
  }

  loading.value = true;

  try {
    const taskData = {
      title: tareaForm.value.title,
      description: tareaForm.value.description,
      completed: tareaForm.value.completed
    };

    if (isEditing.value) {
      await updateTask(tareaForm.value.id, taskData);
      toast.success("Tarea actualizada correctamente");
    } else {
      await postTasks(taskData);
      toast.success("Tarea creada correctamente");
    }

    displayTaskDialog.value = false;
    await cargarTareas(); // Recargar las tareas después de guardar
  } catch (error) {
    const errorMsg = isEditing.value 
      ? "Error al actualizar la tarea" 
      : "Error al crear la tarea";
    toast.error(errorMsg);
    console.error(errorMsg, error);
  } finally {
    loading.value = false;
  }
};

// Función para cambiar el estado de la tarea (completada/pendiente)
const cambiarEstadoTarea = async (tarea) => {
  try {
    const nuevoEstado = !tarea.completed;
    
    const taskData = {
      title: tarea.title,
      description: tarea.description,
      completed: nuevoEstado
    };

    await updateTask(tarea.id, taskData);
    
    const mensaje = nuevoEstado ? 'Tarea marcada como completada' : 'Tarea marcada como pendiente';
    toast.success(mensaje);
    
    await cargarTareas(); // Recargar las tareas después de actualizar
  } catch (error) {
    toast.error("Error al actualizar el estado de la tarea");
    console.error("Error al cambiar estado:", error);
  }
};

// Filtrar tareas según el texto de búsqueda
const tareasFiltradas = computed(() => {
  if (!filtro.value) return tareas.value;
  return tareas.value.filter(
    (tarea) =>
      tarea.title.toLowerCase().includes(filtro.value.toLowerCase()) ||
      (tarea.description && tarea.description.toLowerCase().includes(filtro.value.toLowerCase()))
  );
});

const confirmarEliminar = (tarea) => {
  tareaSeleccionada.value = tarea;
  displayDeleteDialog.value = true;
};

const eliminarTarea = async () => {
  loading.value = true;
  
  try {
    await deleteTask(tareaSeleccionada.value.id);
    toast.success("Tarea eliminada correctamente");
    await cargarTareas(); // Recargar las tareas después de eliminar
  } catch (error) {
    toast.error("Error al eliminar la tarea");
    console.error("Error al eliminar tarea:", error);
  } finally {
    loading.value = false;
    displayDeleteDialog.value = false;
    tareaSeleccionada.value = null;
  }
};
</script>

<style scoped>
.confirmation-content {
  display: flex;
  align-items: center;
}

.field {
  margin-bottom: 1rem;
}
</style>
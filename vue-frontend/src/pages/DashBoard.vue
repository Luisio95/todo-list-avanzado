<template>
  <div>
    <div class="layout">
      <header class="header">
        <div class="w-100">
          <div class="d-flex justify-content-between align-items-center">
            <img src="/logosvg.svg" alt="Logo" style="width:10vw" />
            <Button
              icon="pi pi-sign-out"
              class="p-button-danger"
              @click="confirmLogout"
            />
          </div>
        </div>
      </header>

      <aside class="sidebar">{/* menú lateral */}</aside>

      <main class="content">
        <div class="dashboard">
          <Card class="m-4">
            <template #content>
              <TaskTable />
            </template>
          </Card>

          <div class="text-center mt-4">
            <span class="app-name">Versión 1.0.1</span>
          </div>
        </div>
      </main>
    </div>

    <Dialog
      v-model:visible="displayConfirmation"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>¿Estás seguro de que quieres cerrar sesión?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="displayConfirmation = false"
          class="p-button-text"
        />
        <Button
          label="Sí"
          icon="pi pi-check"
          @click="handleLogout"
          class="p-button-danger"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import TaskTable from '../components/TaskTable.vue';

const router = useRouter();
const displayConfirmation = ref(false);

const confirmLogout = () => {
  displayConfirmation.value = true;
};

const handleLogout = () => {
  // Limpiar localStorage
  localStorage.clear();
  // Ocultar diálogo
  displayConfirmation.value = false;
  // Redirigir a login
  router.push('/');
};
</script>


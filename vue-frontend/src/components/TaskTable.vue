<template>
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1 className="mb-0"></h1>
      <Button
        label="Crear nueva tarea"
        icon="pi pi-plus"
        class="p-button-primary"
        @click="nuevaTarea"
        raised
      />
    </div>
     <div className="mb-3 flex justify-content-between align-items-center">
          <InputText
            id="filtro"
            value={filtro}
            onchange="filtro = $event.target.value"
            class="w-50"
          />
          <label htmlFor="filtro">Buscar tarea...</label>
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

</script>

<style scoped></style>

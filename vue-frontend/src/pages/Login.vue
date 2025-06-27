<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-center min-vh-100 bg-light"
    >
      <Card style="max-width: 400px; width: 100%">
        <template #title>
          <div class="text-center mb-4">
            <img src="/logosvg.svg" alt="Logo" class="w-50" />
            <h2 class="mt-3">Iniciar Sesión</h2>
          </div>
        </template>

        <template #content>
          <form @submit.prevent="handleSubmit" class="d-flex flex-column gap-3">
            <div class="d-flex-column gap-2">
              <label for="username">Email</label>
              <InputText id="username" v-model="email" class="w-100" />
            </div>

            <div class="d-flex-column gap-2">
              <label for="password">Contraseña</label>
              <Password id="password" v-model="password" toggleMask  />
            </div>

            <Button
              label="Iniciar sesión"
              icon="pi pi-sign-in"
              type="submit"
              class="w-100"
              raised
            />
            <Button
              label="Crear cuenta"
              link
              @click="onSwitchToRegister"
              class="w-100 p-0"
            />
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Card from "primevue/card";
import { toast } from "vue3-toastify";

interface Props {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
}

const props = defineProps<Props>();
const router = useRouter();

const email = ref("");
const password = ref("");

const isValid = () => {
  return email.value.trim() !== "" && password.value.trim() !== "";
};

const isEmailValid = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = () => {
  if (!isValid()) {

toast.warn("Usuario y contraseña son requeridos");
    return;
  }

  if (!isEmailValid(email.value)) {

    toast.warn("El correo electrónico no es válido");

    return;
  }

  props.onLogin(email.value, password.value);
  router.push("/dashboard");
};
</script>

<style scoped>
/* Estilos personalizados */
.bg-light {
  background-color: #f8f9fa;
}
.min-vh-100 {
  min-height: 100vh;
}
.d-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.justify-content-center {
  justify-content: center;
}
.gap-3 {
  gap: 1rem;
}
.w-50 {
  width: 50%;
}
.w-100 {
  width: 100%;
}
.mt-3 {
  margin-top: 1rem;
}
.mb-4 {
  margin-bottom: 1.5rem;
}
.p-0 {
  padding: 0;
}
.text-center {
  text-align: center;
}
</style>

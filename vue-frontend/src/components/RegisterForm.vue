<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-center min-vh-100 bg-light"
    >
      <Card style="max-width: 500px; width: 100%">
        <template #title>
          <div class="text-center mb-4">
            <img src="/logosvg.svg" alt="Logo" class="w-50" />
            <h2 class="mt-3">Registro</h2>
          </div>
        </template>

        <template #content>
          <form @submit.prevent="handleSubmit" class="d-flex flex-column gap-3">
            <div class="row">
              <div class="col-6">
                <div class="d-flex-column gap-2">
                  <label for="username">Nombre de usuario</label>
                  <InputText id="username" v-model="username" class="w-100" />
                </div>
              </div>
              <div class="col-6">
                <div class="d-flex-column gap-2">
                  <label for="email">Correo</label>
                  <InputText id="email" v-model="email" class="w-100" />
                </div>
              </div>
              <div class="col-6">
                <div class="d-flex-column gap-2">
                  <label for="password">Contraseña</label>
                  <Password id="password" v-model="password" toggleMask :feedback="false" />
                </div>
              </div>
              <div class="col-6">
                <div class="d-flex-column gap-2">
                  <label for="confirmPassword">Confirmar contraseña</label>
                  <Password
                    id="confirmPassword"
                    v-model="confirmPassword"
                    toggleMask
                    :feedback="false"
                  />
                </div>
              </div>
            </div>

            <Button
              label="Crear cuenta"
              icon="pi pi-user-plus"
              type="submit"
              class="w-100"
              raised
              :loading="loading"
            />
            <Button
              label="Iniciar Sesión"
              link
              @click="onSwitchToLogin"
              class="w-100 p-0"
            />
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Card from "primevue/card";
import { toast } from "vue3-toastify";
import { registerUser } from "../composables/request";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);

const onSwitchToLogin = () => {
  router.push("/");
};

const isValid = () => {
  if (!username.value.trim()) {
    toast.warn("El nombre de usuario es requerido");
    return false;
  }
  
  if (!email.value.trim()) {
    toast.warn("El correo electrónico es requerido");
    return false;
  }
  
  if (!isEmailValid(email.value)) {
    toast.warn("Por favor ingrese un correo electrónico válido");
    return false;
  }
  
  if (!password.value.trim()) {
    toast.warn("La contraseña es requerida");
    return false;
  }
  
  if (password.value !== confirmPassword.value) {
    toast.warn("Las contraseñas no coinciden");
    return false;
  }
  
  return true;
};

const isEmailValid = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = async () => {
  if (!isValid()) return;

  try {
    loading.value = true;
    const response = await registerUser(
      username.value,
      email.value,
      password.value
    );
    
    if (response) {
      toast.success("Registro exitoso. Por favor inicie sesión.");
      router.push("/");
    }
  } catch (error) {
    console.error("Error en registro:", error);
    toast.error(error.response?.data?.message || "Error al registrar usuario");
  } finally {
    loading.value = false;
  }
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
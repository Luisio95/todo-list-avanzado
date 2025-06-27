
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { toast } from "vue3-toastify";

//PrimeVue
import PrimeVue from 'primevue/config';
import './assets/css/StylesPrimeVue.css'
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    ripple: true,
    locale: {
      firstDayOfWeek: 1,
      dayNames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      monthNamesShort: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      today: "Hoy",
      clear: "Borrar",
      weekHeader: "Sm"
    }
  });
app.use(Vue3Toasity, {
    autoClose: 3000,
    position: "top-right",
    theme: "colored",
    transition: "bounce",
    // multiple: false,
  });

app.mount('#app')
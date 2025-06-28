import { ref } from 'vue'
import { defineStore } from "pinia";

export const useTaskStore = defineStore("tasks", () => {
    // Personal info
    const tareas = ref([]);



    return {
        tareas,
    };
});
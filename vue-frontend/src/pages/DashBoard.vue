<template>
       <div>
      <div className="layout">
        <header className="header">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <img src="/logosvg.svg" alt="Logo" style="width:10vw"  />
              <Button
                icon="pi pi-sign-out"
                class="p-button-danger"
                onClick={handleLogout}
              />
            </div>
          </div>
        </header>

        <aside className="sidebar">{/* menú lateral */}</aside>

        <main className="content">
          <div className="dashboard">
            <Card class="m-4">
                <template #content>
                    <TaskTable />
                </template>
            </Card>

            <div className="text-center mt-4">
              <span className="app-name">Versión 1.0.1</span>
            </div>
          </div>
        </main>
      </div>
    </div>
</template>

<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import TaskTable from '../components/TaskTable.vue';
</script>

<style>

</style>
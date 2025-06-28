📝 Descripción del Proyecto

Aplicación TODO List avanzada con autenticación JWT, desarrollada con dos enfoques frontend distintos:

1.- Versión React: Implementada con Redux, PrimeReact y TypeScript
2.- Versión Vue: Desarrollada con Composition API y Pinia para gestión de estado y TypeScript

El diseño de la interfaz de usuario se inspiró en el framework ExtJS, buscando ofrecer una experiencia profesional y consistente. El sistema incluye:

-  Autenticación segura basada en JWT (registro/login)
-  Gestión completa de tareas (CRUD) con validaciones
-  Interfaz moderna y responsive en ambas versiones
-  Arquitectura escalable tanto en frontend como backend
-  Documentación API completa con Swagger

Despliegues disponibles:
Versión React (enlace pendiente)
Versión Vue (enlace pendiente)

🛠️ Tecnologías Utilizadas

Frontend (React)
  React con TypeScript
  Vite como bundler y entorno de desarrollo
  Redux Toolkit para gestión de estado
  React Router para navegación
  PrimeReact para componentes UI
  Bootstrap para estilos base
  Axios para comunicación con API
  JWT para autenticación
  
Backend (Node.js)
  Node.js con TypeScript
  Express como framework web
  Sequelize como ORM para MySQL
  JWT para autenticación
  Swagger para documentación API
  Bcrypt para hashing de contraseñas

Base de Datos
  MySQL como sistema de base de datos relacional

⚙️ Instalación y Configuración

Requisitos Previos
  Node.js (v16+)
  MySQL (v8+)
  npm o Yarn
  (Opcional) XAMPP para instalar MySQL fácilmente

1️⃣ Clonar el Repositorio
  bash
  Copiar
  Editar
  git clone [URL_DEL_REPOSITORIO]
  cd todo-list-avanzada

2️⃣ Configurar la Base de Datos
Si no cuentas con MySQL instalado, puedes descargar e instalar XAMPP y activar el módulo MySQL y APACHE.

Luego, crea una base de datos con el siguiente nombre:

  sql
  CREATE DATABASE BD_todoList;

3️⃣ Configurar Variables de Entorno
Cada proyecto (backend y frontend) contiene un archivo .env.example en su raíz con los ejemplos de configuración necesarios.

Copia y renombra este archivo como .env, y modifica los valores según tu entorno:

🔐 Para generar el secreto del JWT puedes usar el siguiente comando en terminal:

  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
4️⃣ Iniciar el Backend
Ubícate en la carpeta del backend y compila el proyecto:

  ```bash
  cd ./backend
  npm install
  npx tsc
  node ./dist/index.js
```
✅ El servidor debería iniciar en el puerto 3001. Verás algo como:

  Servidor corriendo en el puerto 3001
  Swagger UI disponible en http://localhost:3001/api-docs

  ![Swagger UI](https://github.com/Luisio95/todo-list-avanzado/blob/main/react-frontend/src/swagger.png)

5️⃣ Iniciar el Frontend (React)
Ahora ejecuta la versión React del frontend:

 ``` bash
  cd ../react-frontend
  npm install
  npm run dev
```
  El frontend debería estar corriendo en http://localhost:5173.

🎯 La versión Vue se encuentra en la carpeta vue-frontend (instalación similar).

📸 Imágenes y Video Demo
A continuación se muestra una captura de la documentación interactiva generada con Swagger para la API:


También puedes ver la aplicación en funcionamiento en el siguiente video:

![Demo en funcionamiento](https://github.com/Luisio95/todo-list-avanzado/blob/main/react-frontend/src/video.gif)

📐 Decisiones de Arquitectura

  Separación de responsabilidades: Frontend y backend en carpetas independientes.
  Tipado fuerte con TypeScript tanto en backend como frontend para mayor robustez.
  Autenticación segura con JWT y Bcrypt.
  Redux Toolkit y Pinia para un manejo global de estado escalable y fácil de mantener.
  Swagger para documentar y probar endpoints rápidamente.
  PrimeReact y Bootstrap para una UI limpia y moderna, con componentes reutilizables.




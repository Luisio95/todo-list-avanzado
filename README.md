# 📋 TODO List Avanzada

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?logo=react)
![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D.svg?logo=vue.js)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933.svg?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1.svg?logo=mysql)

**Aplicación TODO List profesional con doble implementación frontend**

[🚀 Demo React](#) • [🚀 Demo Vue](#) • [📖 Documentación API](#) • [🐛 Reportar Bug](#)

</div>

---

## 📖 Descripción del Proyecto

> **Una aplicación TODO List avanzada con autenticación JWT, desarrollada con dos enfoques frontend distintos para demostrar versatilidad y mejores prácticas.**

### 🎯 Características Principales

<table>
<tr>
<td width="50%">

**🔐 Autenticación Segura**
- Sistema JWT completo
- Registro y login de usuarios
- Protección de rutas en frontend y backend

**📝 Gestión de Tareas**
- CRUD completo con validaciones
- Estados de tareas (completada/pendiente)
- Filtros y búsqueda avanzada
- Paginacion
</td>
<td width="50%">

**🎨 Interfaz Moderna**
- Diseño responsive
- Inspirado en ExtJS
- Componentes reutilizables

**⚡ Arquitectura Escalable**
- TypeScript en todo el stack
- Documentación API con Swagger
- Doble implementación frontend

</td>
</tr>
</table>

### 🏗️ Arquitectura del Sistema

```
📦 todo-list-avanzada/
├── 🗄️ backend/           # API REST con Node.js + Express + sequelize
├── ⚛️ react-frontend/     # Versión React + Redux + hooks
├── 🟢 vue-frontend/       # Versión Vue + Pinia + composables
└── 🐳 docker-compose.yml  # Containerización
```

📁 Árbol de Directorios
### 
<details>
<summary><b>🏗️ Estructura del Backend</b></summary>

<br>

```
📦 backend/
├── 📁 @types/                    # Definiciones de tipos TypeScript
├── 📁 dist/                      # Código compilado de TypeScript
├── 📁 node_modules/              # Dependencias del proyecto
├── 📁 src/                       # Código fuente principal
│   ├── 📁 controllers/           # Controladores de rutas
│   │   ├── 📄 authController.ts    # Controlador de autenticación
│   │   └── 📄 taskController.ts    # Controlador de tareas
│   ├── 📁 middlewares/           # Middlewares personalizados
│   │   └── 📄 authMiddlewares.ts   # Middleware de autenticación JWT
│   ├── 📁 models/                # Modelos de base de datos (Sequelize)
│   │   ├── 📄 Task.ts              # Modelo de tareas
│   │   └── 📄 User.ts              # Modelo de usuarios
│   ├── 📁 routes/                # Definición de rutas
│   │   ├── 📄 authRoutes.ts        # Rutas de autenticación
│   │   └── 📄 taskRoutes.ts        # Rutas de tareas
│   ├── 📁 swagger/               # Documentación de API
│   │   └── 📄 schemas.ts           # Esquemas de Swagger
│   ├── 📁 utils/                 # Utilidades y helpers
│   │   ├── 📄 asyncHandlers.ts     # Manejadores asíncronos
│   │   ├── 📄 swagger.ts           # Configuración de Swagger
│   │   ├── 📄 database.ts          # Configuración de base de datos
│   │   └── 📄 index.ts             # Archivo principal del servidor
├── 📄 .env                       # Variables de entorno
├── 📄 .env.example              # Ejemplo de variables de entorno
├── 🐳 Dockerfile.dev            # Dockerfile para desarrollo
├── 🔒 package-lock.json         # Lock de dependencias
├── 📦 package.json              # Configuración del proyecto
└── ⚙️ tsconfig.json             # Configuración de TypeScript
```

</details>

<details>
<summary><b>🏗️ Estructura del FrontEnd React</b></summary>

<br>

```
📦 react-frontend/
├── 📁 src/                       # Código fuente principal
│   ├── 📁 api/                   # Servicios de API
│   │   ├── 📄 auth.ts              # Servicios de autenticación
│   │   └── 📄 tasks.ts             # Servicios de tareas
│   ├── 📁 assets/                # Recursos estáticos
│   ├── 📁 components/            # Componentes reutilizables
│   │   ├── 📁 login/             # Componentes de autenticación
│   │   │   ├── ⚛️ LoginForm.tsx      # Formulario de inicio de sesión
│   │   │   ├── ⚛️ RegisterForm.tsx   # Formulario de registro
│   │   │   ├── ⚛️ SelectForm.tsx     # Selector de formularios
│   │   │   └── ⚛️ Validators.tsx     # Validadores de formularios
│   │   └── 📁 table/             # Componentes de tabla
│   │       └── ⚛️ TaskTable.tsx      # Tabla de tareas
│   ├── 📁 pages/                 # Páginas principales
│   │   ├── ⚛️ AuthPage.tsx           # Página de autenticación
│   │   └── ⚛️ Dashboard.tsx          # Página principal/dashboard
│   ├── 📁 store/                 # Estado global (Redux)
│   │   ├── 📁 slices/            # Slices de Redux Toolkit
│   │   │   ├── 📄 authSlice.ts       # Estado de autenticación
│   │   │   └── 📄 taskSlice.ts       # Estado de tareas
│   │   └── 📄 index.ts             # Configuración del store
│   ├── 📁 styles/                # Estilos globales
│   ├── 📁 types/                 # Definiciones de TypeScript
│   │   └── ⚛️ Interfaces.tsx         # Interfaces de datos
│   ├── 📁 utils/                 # Utilidades
│   │   ├── 📄 axiosInstance.ts     # Configuración de Axios
│   │   └── 📄 toastUtils.ts        # Utilidades de notificaciones
│   ├── 🎨 App.css                # Estilos de la aplicación
│   ├── ⚛️ App.tsx                 # Componente principal
│   └── 🎨 index.css              # Estilos globales
```

</details>

<details>
<summary><b>🏗️ Estructura del FrontEnd Vue</b></summary>

<br>

```
📦 react-frontend/
├── 📁 src/                       # Código fuente principal
│   ├── 📁 assets/                # Recursos estáticos
│   ├── 📁 components/            # Componentes reutilizables
│   │   ├── 📁 login/             # Componentes de autenticación
│   │   │   ├── 🟢 RegisterForm.vue   # Formulario de registro
│   │       └── 🟢 TaskTable.vue      # Tabla de tareas
│   └── 📁 composables/             # Composables
│   │       └── 🟢 request.ts      # Conectrado de peticiones http
│   ├── 📁 pages/                 # Páginas principales
│   │   └── 🟢 Dashboard.vue     # Página principal/dashboard
│   │   ├── 🟢 Login.vue         # Página de Login
│   │   ├── 🟢 Register.vue      # Página de registro
│   ├── 📁 router/                 # Router
│   │   └── 📄 index.ts             # Configuración del router
│   ├── 📁 store/                 # Store global
│   │   └── 📄 task.ts             # Configuración del router
│   ├── 🎨 App.vue                # main de la aplicación
│   ├── ⚛️ main.js                 # min principal
│   └── 🎨 style.css              # Estilos globales
```

</details>


---

## 🛠️ Stack Tecnológico

<details>
<summary><b>🖥️ Frontend React</b></summary>

<br>

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) | 18.x | Framework principal |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | 5.x | Tipado estático |
| ![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white) | Toolkit | Gestión de estado |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | Latest | Build tool |
| ![PrimeReact](https://img.shields.io/badge/-PrimeReact-007AD9?logoColor=white) | Latest | Componentes UI |

</details>

<details>
<summary><b>🟢 Frontend Vue</b></summary>

<br>

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![Vue](https://img.shields.io/badge/-Vue.js-4FC08D?logo=vue.js&logoColor=white) | 3.x | Framework principal |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | 5.x | Tipado estático |
| ![Pinia](https://img.shields.io/badge/-Pinia-FFD43B?logoColor=black) | Latest | Gestión de estado |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | Latest | Build tool |

</details>

<details>
<summary><b>🔧 Backend</b></summary>

<br>

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | 18.x | Runtime |
| ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | Latest | Framework web |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | 5.x | Tipado estático |
| ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white) | Latest | ORM |
| ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white) | Latest | Autenticación |
| ![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?logo=swagger&logoColor=black) | Latest | Documentación API |

</details>

<details>
<summary><b>💾 Base de Datos</b></summary>

<br>

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white) | 8.x | Base de datos |

</details>

---

## 🚀 Instalación y Configuración

### 📋 Requisitos Previos

> ⚠️ **Importante**: Asegúrate de tener instalados los siguientes requisitos antes de continuar.

<table>
<tr>
<td align="center">
<img src="https://nodejs.org/static/images/logo.svg" width="50"><br>
<b>Node.js</b><br>
<sub>v16 o superior</sub>
</td>
<td align="center">
<img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" width="50"><br>
<b>MySQL</b><br>
<sub>v8 o superior</sub>
</td>
<td align="center">
<img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg" width="50"><br>
<b>npm/Yarn</b><br>
<sub>Gestor de paquetes</sub>
</td>
</tr>
</table>

### 1️⃣ Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd todo-list-avanzada
```

### 2️⃣ Configurar Base de Datos

<details>
<summary><b>🔧 Configuración MySQL</b></summary>

<br>

**Opción 1: MySQL Nativo**
```sql
CREATE DATABASE BD_todoList;
```

**Opción 2: Con XAMPP**
1. Descargar e instalar [XAMPP](https://www.apachefriends.org/)
2. Activar módulos MySQL y Apache
3. Crear la base de datos desde phpMyAdmin

</details>

### 3️⃣ Variables de Entorno

> 📝 **Nota**: Cada proyecto tiene un archivo `.env.example` con la configuración necesaria.
Ejemplo backend:

```bash
DB_HOST=localhost
DB_USER=tu_usuario #por lo general el por defecto es root
DB_PASSWORD=tu contraseña de mysql por defecto es vacio
DB_NAME=BD_todoList
JWT_SECRET=tuJWT secreto
PORT=3001  # o el puerto que prefieras```

**Generar secreto JWT:**
  Desde tu cmd ejecuta el siguiente comando y copia / pega el token en la variable JWT_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Ejemplo frontend:

```bash
VITE_API_URL=http://localhost:3001 //Para VUE
VITE_API_BASE_URL=http://localhost:3001 //Para RACT
```

### 4️⃣ Iniciar Backend

```bash
cd ./backend
npm install
npx tsc
node ./dist/index.js
```

<div align="center">

✅ **Servidor iniciado correctamente**

🌐 **API**: http://localhost:3001  
📚 **Swagger**: http://localhost:3001/api-docs

</div>

### 5️⃣ Iniciar Frontend

<table>
<tr>
<td width="50%">

**⚛️ Versión React**
```bash
cd ../react-frontend
npm install
npm run dev
```
🌐 http://localhost:5173

</td>
<td width="50%">

**🟢 Versión Vue**
```bash
cd ../vue-frontend
npm install
npm run dev
```
🌐 http://localhost:5174

</td>
</tr>
</table>

---

## 🐳 Despliegue con Docker

<details>
<summary><b>🚀 Comandos Docker</b></summary>

<br>

**1. Construir y levantar contenedores:**
```bash
docker-compose up -d --build
```

**2. Ejecutar migraciones:**
```bash
docker-compose exec backend npx sequelize-cli db:migrate
```

**3. Acceder a servicios:**
- 🔗 **API**: http://localhost:3001
- ⚛️ **React**: http://localhost:5173  
- 🟢 **Vue**: http://localhost:5174
- 💾 **MySQL**: puerto 3306

**4. Detener servicios:**
```bash
docker-compose down
```

</details>

---

## 📸 Capturas y Demo

<div align="center">

### 📚 Documentación API (Swagger)
![Swagger UI](https://github.com/Luisio95/todo-list-avanzado/blob/main/react-frontend/src/swagger.png)

### 🎬 Demo en Funcionamiento
![Demo GIF](https://github.com/Luisio95/todo-list-avanzado/blob/main/react-frontend/src/video.gif)

</div>

---

## 🏗️ Decisiones de Arquitectura

<div align="center">

### 🎯 Principios de Diseño

</div>

| Principio | Implementación | Beneficio |
|-----------|---------------|-----------|
| **🔄 Separación de Responsabilidades** | Frontend y backend independientes | Mantenibilidad y escalabilidad |
| **🛡️ Tipado Fuerte** | TypeScript en todo el stack | Menos errores, mejor DX |
| **🔐 Seguridad** | JWT + Bcrypt | Autenticación robusta |
| **📱 Responsividad** | Bootstrap + PrimeReact/PrimeVue | Experiencia consistente |
| **📖 Documentación** | Swagger UI integrado | API autodocumentada |
| **🧪 Testing** | Jest + Testing Library | Código confiable |

---

## 🤝 Contribución

<div align="center">

¿Te gustaría contribuir? ¡Excelente! 

[🐛 Reportar Bug](../../issues) • [💡 Solicitar Feature](../../issues) • [🔀 Pull Request](../../pulls)

</div>

### 📝 Pasos para Contribuir

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request


**Desarrollado con ❤️ por Luis Rivera**

[![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)]([https://github.com/kuisio](https://github.com/Luisio95))
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luis-felipe-rivera-granados-2488b2188/)

</div>

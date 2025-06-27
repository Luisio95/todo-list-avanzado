"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // si usas sesiones o cookies
}));
app.use('/auth', authRoutes_1.default);
app.use('/api', taskRoutes_1.default);
const PORT = process.env.PORT || 3001;
database_1.default.sync({ force: false }).then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch(error => console.log('Error al conectar a la base de datos:', error));

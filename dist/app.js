"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./router");
const DBStorage_connection_1 = require("./DBStorage.connection");
const PORT = process.env.PORT || 3600;
const app = (0, express_1.default)();
const route = process.env.PRODUCTION === "TRUE" ? "/api" : "/api-dev";
(0, DBStorage_connection_1.StorageConnection)();
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json());
app.use(route, router_1.router);
app.listen(PORT, () => console.log(`Successful deploy by port ${PORT}`));

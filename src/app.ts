import "dotenv/config"
import express from 'express';
import cors from 'cors';
import { router } from "./router";
import { StorageConnection } from "./DBStorage.connection";

const PORT = process.env.PORT || 3600;

const app = express();
const route = process.env.PRODUCTION === "TRUE" ? "/api" : "/api-dev";

StorageConnection();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use(route, router);

app.listen(PORT, () => console.log(`Successful deploy by port ${PORT}`));
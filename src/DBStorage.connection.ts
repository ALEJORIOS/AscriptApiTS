import { v2 as Storage } from "cloudinary";
import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_KEY || "";
const DATABASE = process.env.PRODUCTION === "TRUE" ?  "Ascript" : "AscriptDev";
const STORAGE_KEY = process.env.STORAGE_KEY || "";

export function dbConnection() {
    return mongoose.createConnection(MONGODB_URI).useDb(DATABASE);
}

export async function StorageConnection() {
    Storage.config({
        cloud_name: 'drpya9e9h',
        api_key: '144269722995126',
        api_secret: STORAGE_KEY,
        secure: true
    })
    return Storage;
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageConnection = exports.dbConnection = void 0;
const cloudinary_1 = require("cloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.DATABASE_KEY || "";
const DATABASE = process.env.PRODUCTION === "TRUE" ? "Ascript" : "AscriptDev";
const STORAGE_KEY = process.env.STORAGE_KEY || "";
function dbConnection() {
    return mongoose_1.default.createConnection(MONGODB_URI).useDb(DATABASE);
}
exports.dbConnection = dbConnection;
function StorageConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        cloudinary_1.v2.config({
            cloud_name: 'drpya9e9h',
            api_key: '144269722995126',
            api_secret: STORAGE_KEY,
            secure: true
        });
        return cloudinary_1.v2;
    });
}
exports.StorageConnection = StorageConnection;

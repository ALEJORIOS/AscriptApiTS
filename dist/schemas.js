"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGES_MODEL = exports.PARAM_MODEL = exports.DOC_MODEL = exports.USER_MODEL = void 0;
const mongoose_1 = require("mongoose");
const DBStorage_connection_1 = require("./DBStorage.connection");
const USER_SCHEMA = new mongoose_1.Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    status: String,
    tabs: Array,
    creationDate: Date,
    country: String,
    donor: Boolean,
    attempts: Object,
    landing: String
});
const DOC_SCHEMA = new mongoose_1.Schema({
    name: String,
    author: String,
    trend: Boolean,
    date: Date,
    views: Number,
    likes: Number,
    description: String,
    content: String,
    seq: Number,
    publish: Boolean
});
const PARAM_SCHEMA = new mongoose_1.Schema({
    name: String,
    value: mongoose_1.Schema.Types.Mixed
});
const PAGES_SCHEMA = new mongoose_1.Schema({
    name: String,
    route: String,
    nameES: String,
    public: Boolean,
    nav: Boolean
});
exports.USER_MODEL = (0, DBStorage_connection_1.dbConnection)().model('users', USER_SCHEMA, "Users");
exports.DOC_MODEL = (0, DBStorage_connection_1.dbConnection)().model('docs', DOC_SCHEMA, 'Docs');
exports.PARAM_MODEL = (0, DBStorage_connection_1.dbConnection)().model('params', PARAM_SCHEMA, 'Params');
exports.PAGES_MODEL = (0, DBStorage_connection_1.dbConnection)().model('pages', PAGES_SCHEMA, 'Pages');

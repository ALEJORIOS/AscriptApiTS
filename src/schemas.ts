import { Schema } from "mongoose";
import { dbConnection } from "./DBStorage.connection";

const USER_SCHEMA = new Schema({
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

const DOC_SCHEMA = new Schema({
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

const PARAM_SCHEMA = new Schema({
    name: String,
    value: Schema.Types.Mixed
})

const PAGES_SCHEMA = new Schema({
    name: String,
    route: String,
    nameES: String,
    public: Boolean,
    nav: Boolean
})

export const USER_MODEL = dbConnection().model('users', USER_SCHEMA, "Users");
export const DOC_MODEL = dbConnection().model('docs', DOC_SCHEMA, 'Docs');
export const PARAM_MODEL = dbConnection().model('params', PARAM_SCHEMA, 'Params');
export const PAGES_MODEL = dbConnection().model('pages', PAGES_SCHEMA, 'Pages');
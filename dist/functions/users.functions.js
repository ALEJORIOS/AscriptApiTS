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
exports.findById = exports.findRegister = exports.verifyEmail = exports.verifyUsername = exports.verifyToken = exports.login = exports.createUser = void 0;
const schemas_1 = require("../schemas");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const general_functions_1 = require("./general.functions");
function createUser(newUserData) {
    return __awaiter(this, void 0, void 0, function* () {
        let obj = {
            username: newUserData.username,
            password: newUserData.password,
            email: newUserData.email,
            name: newUserData.name,
            status: 'UNVERIFIED',
            tabs: ['Home', 'Communities', 'Write', 'Sponsor', 'Read'],
            creationDate: new Date(),
            country: '',
            donor: false,
            attempts: {
                attempts: 0,
                lastIP: ''
            }
        };
        yield bcrypt_1.default.hash(newUserData.password, 13).then(res => {
            obj.password = res;
        });
        return yield schemas_1.USER_MODEL.create(obj);
    });
}
exports.createUser = createUser;
function login(user, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let confirmation;
        const userData = yield schemas_1.USER_MODEL.findOne({ username: user });
        return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
            if (userData === null) {
                res({ status: -1 });
            }
            else if (userData.status === 'BLOCKED') {
                res({ status: 2 });
            }
            else {
                yield bcrypt_1.default.compare(password, (userData === null || userData === void 0 ? void 0 : userData.password) || "").then(res => {
                    confirmation = res ? 1 : 0;
                });
                if (confirmation === 1) {
                    const JWT_SECRET_KEY = process.env.JWT_KEY || "";
                    let token = jsonwebtoken_1.default.sign({ name: userData.name, username: userData.username }, JWT_SECRET_KEY);
                    yield schemas_1.USER_MODEL.findOneAndUpdate({ _id: userData._id }, { attempts: { attempts: 0 } });
                    res({ status: 1, value: token, landing: yield (0, general_functions_1.translator)((userData === null || userData === void 0 ? void 0 : userData.landing) || "", schemas_1.PAGES_MODEL, 'route') });
                }
                else {
                    if (userData.attempts.attempts >= 3) {
                        yield schemas_1.USER_MODEL.findOneAndUpdate({ _id: userData._id }, { status: 'BLOCKED' });
                    }
                    else {
                        yield schemas_1.USER_MODEL.findOneAndUpdate({ _id: userData._id }, { $inc: { "attempts.attempts": 1 } });
                    }
                    res({ status: 0 });
                }
            }
        }));
    });
}
exports.login = login;
function verifyToken() {
    return {
        code: 1,
        message: 'valid Token'
    };
}
exports.verifyToken = verifyToken;
function update() {
}
function hardUpdate() {
}
function checkExistence(userData) {
}
function verifyUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield schemas_1.USER_MODEL.findOne({ username })) ? false : true;
    });
}
exports.verifyUsername = verifyUsername;
function verifyEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield schemas_1.USER_MODEL.findOne({ email })) ? false : true;
    });
}
exports.verifyEmail = verifyEmail;
function findRegister(stringToCompare, ableEmails = true) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!stringToCompare) {
            return {};
        }
        if (ableEmails) {
            return yield schemas_1.USER_MODEL.find({ $or: [{ username: { $regex: new RegExp(stringToCompare), $options: "i" } }, { email: { $regex: new RegExp(stringToCompare), $options: "i" } }] });
        }
        else {
            return yield schemas_1.USER_MODEL.find({ username: { $regex: new RegExp(stringToCompare), $options: "i" } });
        }
    });
}
exports.findRegister = findRegister;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schemas_1.USER_MODEL.findOne({ _id: id });
    });
}
exports.findById = findById;
function setToken() {
}
function test() {
}

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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const pages_functions_1 = require("../functions/pages.functions");
const users_functions_1 = require("../functions/users.functions");
const router = express_1.default.Router();
router.get('/find', (req, res) => {
    const reqString = req.query.string;
    (0, users_functions_1.findRegister)(reqString, true)
        .then(response => res.json(response))
        .catch(err => {
        console.error(err);
        res.send('ERROR');
    });
});
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_functions_1.createUser)(req.body)
        .then(response => res.json({ msg: 'SUCCESS' }))
        .catch(err => {
        console.error(err);
        res.send('ERROR');
    });
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, users_functions_1.login)(req.body.username, req.body.password)
        .then(response => res.json(response))
        .catch(err => {
        console.error(err);
        res.send('ERROR');
    });
}));
router.get('/verify-username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUsername = req.query.username;
    (0, users_functions_1.verifyUsername)(reqUsername)
        .then(response => res.json(response))
        .catch(err => {
        console.error(err);
        res.send('ERROR');
    });
}));
router.get('/verify-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqEmail = req.query.email;
    (0, users_functions_1.verifyEmail)(reqEmail)
        .then(response => res.json(response))
        .catch(err => {
        console.error(err);
        res.send('ERROR');
    });
}));
router.get('/private-pages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, pages_functions_1.getPrivatePages)(req.body.decoded.username)
        .then(response => res.json(response))
        .catch(err => {
        console.error(err);
        res.send('ERROR');
    });
}));
router.get('/nav-public', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, pages_functions_1.getPublicNavPages)()
        .then(response => res.json(response))
        .catch(err => {
        console.error(err);
        res.send('ERROR');
    });
}));
router.get('/verifyToken', (req, res) => {
    res.json((0, users_functions_1.verifyToken)());
});
router.put('/hard-update', (req, res) => {
});
router.patch('/update', (req, res) => {
});
exports.userRouter = router;

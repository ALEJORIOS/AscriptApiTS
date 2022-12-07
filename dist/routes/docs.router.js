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
exports.docsRouter = void 0;
const express_1 = __importDefault(require("express"));
const docs_functions_1 = require("../functions/docs.functions");
const router = express_1.default.Router();
router.get('/preview-trends', (req, res) => {
    const reqTake = ~~req.query.take;
    (0, docs_functions_1.previewTrends)(reqTake)
        .then((response) => res.json(response))
        .catch((err) => {
        console.error(err);
        res.send('ERROR');
    });
});
router.get('/read', (req, res) => {
    const reqSeq = ~~req.query.seq;
    (0, docs_functions_1.read)(reqSeq)
        .then((response) => res.send(response))
        .catch((err) => {
        console.error(err);
        res.json({ msg: 'ERROR' });
    });
});
router.get('/seq', (req, res) => {
    (0, docs_functions_1.getSeq)()
        .then((response) => res.json(response.value))
        .catch((err) => {
        console.error(err);
        res.json({ msg: 'ERROR' });
    });
});
router.get('/current-seq', (req, res) => {
    (0, docs_functions_1.getCurrentSeq)()
        .then((response) => res.json(response.value))
        .catch((err) => {
        console.error(err);
        res.json({ msg: 'ERROR' });
    });
});
router.post('/save-doc', (req, res) => {
    (0, docs_functions_1.save)(req.body.name, req.body.author, req.body.date, req.body.content, req.body.seq)
        .then((response) => res.json(response))
        .catch((err) => {
        console.error(err);
        res.json({ msg: 'ERROR' });
    });
});
router.post('/publish-doc', (req, res) => {
    (0, docs_functions_1.publish)(req.body.name, req.body.author, req.body.date, req.body.content, req.body.seq)
        .then((response) => res.json(response))
        .catch((err) => {
        console.error(err);
        res.json({ msg: 'ERROR' });
    });
});
router.get('/download-img', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, docs_functions_1.downloadImage)(req.headers.id)
        .then((response) => res.json(response))
        .catch((err) => {
        console.error(err);
        res.json({ msg: 'ERROR' });
    });
}));
exports.docsRouter = router;
function readBodyAsBuffer(req) {
    return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0);
        req.setEncoding(null);
        req.on("data", (chunk) => (buffer = Buffer.concat([buffer, Buffer.from(chunk)])));
        req.on("end", () => resolve(buffer));
        req.on("error", reject);
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const docs_functions_1 = require("../functions/docs.functions");
const pages_functions_1 = require("../functions/pages.functions");
const router = (0, express_1.Router)();
router.get('/nav-pages', (req, res) => {
    (0, pages_functions_1.getNavPages)()
        .then(response => res.json(response))
        .catch(err => console.error(err));
});
router.get('/seq', (req, res) => {
    (0, docs_functions_1.getSeq)()
        .then(response => res.json(response))
        .catch(err => {
        console.error(err);
        res.json({ msg: 'ERROR' });
    });
});
router.get('/current', (req, res) => {
    (0, docs_functions_1.currentSeq)()
        .then(response => res.json(response))
        .catch(err => {
        console.error(err);
        res.json({ msg: 'ERROR' });
    });
});
router.get('/phrase', (req, res) => {
    (0, pages_functions_1.getPhrase)()
        .then(response => res.json(response === null || response === void 0 ? void 0 : response.value))
        .catch(err => {
        console.error(err);
        res.json({ msg: 'ERROR' });
    });
});
exports.mainRouter = router;

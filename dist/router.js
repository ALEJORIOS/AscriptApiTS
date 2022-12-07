"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const docs_router_1 = require("./routes/docs.router");
const main_router_1 = require("./routes/main.router");
const user_router_1 = require("./routes/user.router");
const router = (0, express_1.Router)();
exports.router = router;
router.use((req, res, next) => {
    var _a;
    let token = req.headers['authorization'];
    const ROUTES_WITHOUT_JWT = ((_a = process.env.ROUTES_WITHOUT_JWT) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
    const JWT_KEY = process.env.JWT_KEY || "";
    if (ROUTES_WITHOUT_JWT.includes(req.path)) {
        next();
    }
    else {
        if (!token) {
            res.json({
                code: 4,
                message: "There is no token",
            });
        }
        else {
            if (token.startsWith("Bearer ")) {
                token = token.slice(7);
            }
            jsonwebtoken_1.default.verify(token, JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.json({
                        code: 5,
                        message: "Invalid Token"
                    });
                }
                else {
                    req.body.decoded = decoded;
                    next();
                }
            });
        }
    }
});
router.use("/user", user_router_1.userRouter);
router.use("/docs", docs_router_1.docsRouter);
router.use("/", main_router_1.mainRouter);

import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { docsRouter } from "./routes/docs.router";
import { mainRouter } from "./routes/main.router";
import { userRouter } from "./routes/user.router";

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];
    const ROUTES_WITHOUT_JWT = process.env.ROUTES_WITHOUT_JWT?.split(",") || [];
    const JWT_KEY = process.env.JWT_KEY || "";

    if (ROUTES_WITHOUT_JWT.includes(req.path)) {
        next();
    } else {
        if (!token) {
            res.json({
                code: 4,
                message: "There is no token",
            })
        } else {
            if (token.startsWith("Bearer ")) {
                token = token.slice(7)
            }
            jwt.verify(token, JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.json({
                        code: 5,
                        message: "Invalid Token"
                    })
                } else {
                    req.body.decoded = decoded;
                    next();
                }
            })
        }
    }
})

router.use("/user", userRouter);
router.use("/docs", docsRouter);
router.use("/", mainRouter)

export { router };
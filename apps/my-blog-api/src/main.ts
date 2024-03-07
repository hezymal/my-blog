import express from "express";
import session from "express-session";
import { authMiddleware } from "./lib/auth-middleware";
import { logMiddleware } from "./lib/log-middleware";
import { authRouter } from "./modules/api/auth/auth-router";
import { postRouter } from "./modules/api/post/post-router";

const MY_BLOG_API_HOST = process.env.MY_BLOG_API_HOST;
const MY_BLOG_API_PORT = Number(process.env.MY_BLOG_API_PORT);
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

app.use(logMiddleware);
app.use(express.json());
app.use(
    session({
        saveUninitialized: true,
        secret: SESSION_SECRET,
        resave: false,
    })
);

app.use("/api/auth", authRouter);

app.use(authMiddleware);
app.use("/api/posts", postRouter);

app.listen(MY_BLOG_API_PORT, MY_BLOG_API_HOST, () => {
    console.log(`[ ready ] http://${MY_BLOG_API_HOST}:${MY_BLOG_API_PORT}`);
});

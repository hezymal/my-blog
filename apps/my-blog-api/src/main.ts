import express from "express";
import session from "express-session";
import { authRouter } from "./modules/api/auth/auth-router";
import { postRouter } from "./modules/api/post/post-router";

const MY_BLOG_API_HOST = process.env.MY_BLOG_API_HOST;
const MY_BLOG_API_PORT = Number(process.env.MY_BLOG_API_PORT);
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

app.use(
    session({
        secret: SESSION_SECRET,
        cookie: { secure: true },
    })
);

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(MY_BLOG_API_PORT, MY_BLOG_API_HOST, () => {
    console.log(`[ ready ] http://${MY_BLOG_API_HOST}:${MY_BLOG_API_PORT}`);
});

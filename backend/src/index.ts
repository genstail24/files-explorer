import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import routes from "./routes";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(routes)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { DbConnect } from "./db";
import flippers from "./routes/flippers";
import brands from "./routes/brands";

const app = new Hono();
await DbConnect();

const port = 3000;
console.log(`Server is running on port ${port}`);

app.route("/api", flippers);
app.route("/api", brands);

app.all("*", (c) => {
  return c.json({
    msg: "en termes de sécurité je dois pas le dire mais je pense que t'as oublié le '/api' 🤨",
  });
});

serve({
  fetch: app.fetch,
  port,
});

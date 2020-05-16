import { listenAndServe } from "https://deno.land/std/http/server.ts";

const port = 3000;

listenAndServe({ port }, async (req) => {
  if (req.method === "GET" && req.url === "/") {
    const body = await Deno.open("./index.html");

    req.respond({
      status: 200,
      headers: new Headers({ "content-type": "text/html" }),
      body,
    });
  }
});

console.log("Deno App Started");

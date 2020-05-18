import { listenAndServe } from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import { chat } from "./chat.ts";

const port = 3001;

listenAndServe({ port }, async (req) => {
  if (req.method === "GET" && req.url === "/") {
    const body = await Deno.open("./index.html");
    return req.respond({
      status: 200,
      headers: new Headers({ "content-type": "text/html" }),
      body,
    });
  }

  if(req.method === 'GET' && req.url === '/ws') {
      if(acceptable(req)) {
          acceptWebSocket({
              conn: req.conn,
              bufWriter: req.w,
              bufReader: req.r,
              headers: req.headers
          }).then(chat)
      }
  }
});

console.log("Deno App Started");

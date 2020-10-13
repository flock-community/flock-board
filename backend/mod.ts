import { serve } from "https://deno.land/std/http/server.ts";
import { extname } from "https://deno.land/std/path/mod.ts";
import { app, createApp } from "./app.ts";
import {internalizeRequest, matchRequest} from "./utils/request.ts";
import { api } from "./api.ts";
import { openApi, router } from "./model/router.ts";

createApp();

const server = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const request of server) {
  try {
    if (request.url === "/openapi") {
      request.respond({
        body: JSON.stringify(openApi),
        status: 200,
      });
    } else if (request.url === "/swagger") {
      request.respond({
        body: await Deno.open("./swagger/index.html"),
        status: 200,
      });
    } else if (request.url.startsWith("/api")) {
      const req = await internalizeRequest(request)
      const route = matchRequest(router, req)
      console.log("route name", route)
      const func = api[route]
      // @ts-ignore
      const res = await func(req)
      request.respond({status: res.status, body:JSON.stringify(res.content), headers:new Headers(res.headers)});
    } else {
      console.log(request.url)
      const url = extname(request.url).includes(".")
          ? request.url
          : "/index.html";
      request.respond({
        body: await app.staticServer.getFile(url),
        headers: new Headers({
          "content-type": contentType(url),
        }),
      });
    }
  } catch (e) {
    request.respond({
      body: e.toString(),
      status: 500,
    });
  }
}

function contentType(path: string): string {
  const mimes: Record<string, string> = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
    ".ico": "image/x-icon",
  };
  return mimes[extname(path).toLowerCase()] ?? "application/octet-stream";
}

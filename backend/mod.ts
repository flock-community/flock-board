import { serve } from "https://deno.land/std@0.53.0/http/server.ts";
import { extname } from "https://deno.land/std/path/mod.ts";
import { app, createApp } from "./app.ts";
// import { Project } from "../database/mod.ts";

createApp();

const server = serve({ port: 8000 });
console.log("http://localhost:8000/");

for await (const request of server) {
  try {
    if (!request.url.startsWith("/api")) {
      const url = extname(request.url).includes(".")
        ? request.url
        : "/index.html";
      request.respond({
        body: await app.staticServer.getFile(url),
        headers: new Headers({
          "content-type": contentType(url),
        }),
      });
    } else if (
      request.url === "/api/project" &&
      request.method.toUpperCase() === "GET"
    ) {
      request.respond({
        body: JSON.stringify(await app.services.projects.getAll()),
      });
    } else if (
      request.url === "/api/project" &&
      request.method.toUpperCase() === "POST"
    ) {
      const jsonBody = JSON.parse(
        new TextDecoder().decode(await Deno.readAll(request.body))
      );
      request.respond({
        body: JSON.stringify(await app.services.projects.create(jsonBody)),
      });
    } else if (
      request.url === "/api/project" &&
      request.method.toUpperCase() === "PUT"
    ) {
      const jsonBody = JSON.parse(
        new TextDecoder().decode(await Deno.readAll(request.body))
      );
      request.respond({
        body: JSON.stringify(
          await app.services.projects.update(jsonBody.id, jsonBody)
        ),
      });
    } else if (
      request.url === "/api/project" &&
      request.method.toUpperCase() === "DELETE"
    ) {
      const jsonBody = JSON.parse(
        new TextDecoder().decode(await Deno.readAll(request.body))
      );
      await app.services.projects.delete(jsonBody.id);
      request.respond({
        status: 204,
      });
    } else if (request.url === "/api/bla") {
      // request.respond({ body: JSON.stringify(await Project.all()) });
    } else {
      request.respond({ body: "Hello World\n" });
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

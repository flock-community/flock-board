import { removePrefix } from "./string.ts";

import type { ServerRequest } from "https://deno.land/std/http/server.ts";

export interface Request {
  path: string[];
  method: string;
  body?: unknown;
  headers: Record<string, unknown>;
  search: Record<string, string>;
}

export async function internalizeRequest(
  serverRequest: ServerRequest
): Promise<Request> {
  const searchIndex = serverRequest.url.indexOf("?");
  let body;
  if (serverRequest.headers.get("content-type") === "application/json") {
    body = JSON.parse(
      new TextDecoder().decode(await Deno.readAll(serverRequest.body))
    );
  }
  return {
    path: removePrefix(serverRequest.url, "/").split("/"),
    method: serverRequest.method.toUpperCase(),
    body: body,
    headers: Object.fromEntries(serverRequest.headers),
    search:
      searchIndex === -1
        ? {}
        : Object.fromEntries(
            new URLSearchParams(serverRequest.url.substring(searchIndex))
          ),
  };
}

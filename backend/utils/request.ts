import * as z from "https://raw.githubusercontent.com/flock-community/zod-router/master/mod.ts";
import { removePrefix } from "./string.ts";

import type { ServerRequest } from "https://deno.land/std/http/server.ts";

type Methods = "GET" | "POST" | "PUT" | "DELETE";
export interface Request {
  path: [...string[]];
  method: Methods;
  headers: Record<string, unknown>;
  query: Record<string, string>;
  body?: {
    type: string;
    content: unknown;
  };
}

export async function internalizeRequest(
  serverRequest: ServerRequest,
): Promise<Request> {
  const searchIndex = serverRequest.url.indexOf("?");
  const body =
    (serverRequest.headers.get("content-type") === "application/json")
      ? ({
        type: serverRequest.headers.get("content-type") ?? "",
        content: JSON.parse(
          new TextDecoder().decode(await Deno.readAll(serverRequest.body)),
        ),
      })
      : undefined;

  return {
    path: removePrefix(serverRequest.url, "/").split("/"),
    method: serverRequest.method.toUpperCase() as Methods,
    headers: Object.fromEntries(serverRequest.headers),
    query: searchIndex === -1 ? {} : Object.fromEntries(
      new URLSearchParams(serverRequest.url.substring(searchIndex)),
    ),
    body: body,
  };
}

export function matchRequest<S extends z.HttpSchema>(
  schema: S,
  request: Request,
): z.ApiRouteNames<S> {
  if ("options" in schema._def) {
    const route = schema._def.options.find((it) =>
      (("items" in it.shape.path._def)
        ? it.shape.path.check(request.path)
        : false) && it.shape.method.check(request.method)
    );
    if (route && "transformer" in route.shape.name._def) {
      // @ts-ignore
      return route.shape.name._def.output._def.value;
    }
  }
  throw new Error("Rout not found");
}

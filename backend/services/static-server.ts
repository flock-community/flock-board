import { assert } from "https://deno.land/std/testing/asserts.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";
import { join } from "https://deno.land/std/path/posix.ts";

const { stat } = Deno;

export interface StaticServer {
  getFile(url: string): Promise<string | Deno.Reader>;
}

export class StaticServerProduction implements StaticServer {
  async getFile(url: string): Promise<Deno.Reader> {
    const filePath = join("./frontend/build", url);
    assert(
      (await exists(filePath)) && (await stat(filePath)).isFile,
      `File doesn't exist: ${filePath}`,
    );
    return await Deno.open(filePath);
  }
}

export class StaticServerDevelopment implements StaticServer {
  public baseUrl: string;

  constructor(options: { baseUrl: string }) {
    this.baseUrl = options.baseUrl;
  }

  getFile(url: string): Promise<string> {
    return fetch(join(this.baseUrl, url)).then((it) => it.text());
  }
}

import { assert } from 'https://deno.land/std/testing/asserts.ts';
import { exists } from 'https://deno.land/std@0.53.0/fs/exists.ts';
import { join } from 'https://deno.land/std@0.53.0/path/posix.ts';

const { stat } = Deno;

export interface StaticServer {
  getFile(url: string): Promise<string | Deno.Reader>;
}

export class StaticServerProduction implements StaticServer {
  async getFile(url: string): Promise<Deno.Reader> {
    const filePath = join('./frontend/build', url);
    assert((await exists(filePath)) && (await stat(filePath)).isFile);
    return await Deno.open(filePath);
  }
}

export class StaticServerDevelopment implements StaticServer {
  getFile(url: string) {
    return fetch(`http://localhost:3000${url}`).then((it) => it.text());
  }
}

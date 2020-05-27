import { serve } from 'https://deno.land/std@0.53.0/http/server.ts';
import { join } from 'https://deno.land/std@0.53.0/path/posix.ts';
import { exists } from 'https://deno.land/std@0.53.0/fs/exists.ts';
import { extname } from 'https://deno.land/std/path/mod.ts';

const { stat } = Deno;

const server = serve({ port: 8000 });
console.log('http://localhost:8000/');

for await (const request of server) {
  try {
    const filePath = join(
      './frontend/build',
      request.url,
      extname(request.url).includes('.') ? '' : 'index.html',
    );
    if ((await exists(filePath)) && (await stat(filePath)).isFile) {
      request.respond({
        body: await Deno.open(filePath),
        headers: new Headers({
          'content-type': contentType(filePath),
        }),
      });
    } else if (request.url === '/project') {
      request.respond({ body: 'Projects\n' });
    } else {
      request.respond({ body: 'Hello World\n' });
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
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.ico': 'image/x-icon',
  };
  return mimes[extname(path).toLowerCase()] ?? 'application/octet-stream';
}

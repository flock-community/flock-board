import { serve } from 'https://deno.land/std@0.53.0/http/server.ts';
import { extname } from 'https://deno.land/std/path/mod.ts';
import { app, createApp } from './app.ts';

createApp();

const server = serve({ port: 8000 });
console.log('http://localhost:8000/');

for await (const request of server) {
  try {
    if (request.url === '/' || extname(request.url).includes('.')) {
      const url = request.url === '/' ? '/index.html' : request.url;
      request.respond({
        body: await app.staticServer.getFile(url),
        headers: new Headers({
          'content-type': contentType(url),
        }),
      });
    } else if (request.url === '/projects' && request.method.toUpperCase() === 'GET') {
      request.respond({
        body: JSON.stringify([
          {
            id: 'id',
            name: 'Project',
            description: 'project description',
            timestamp: new Date(),
            state: 'OPEN',
          },
        ]),
      });
    } else if (request.url === '/test') {
      request.respond({ body: 'test kasper\n' });
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

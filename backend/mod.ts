import { serve } from "https://deno.land/std@0.53.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
    if (req.url === '/project') {
        req.respond({ body: "Projects\n" });
    } else {
        req.respond({ body: "Hello World\n" });
    }
}

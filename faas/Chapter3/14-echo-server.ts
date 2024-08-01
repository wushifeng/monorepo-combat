import { serve } from 'https://deno.land/std@0.170.0/http/mod.ts';
function reqHandler(req: Request) {
  return new Response(req.body, {
    headers: req.headers,
  });
}
serve(reqHandler, { port: 8000 });

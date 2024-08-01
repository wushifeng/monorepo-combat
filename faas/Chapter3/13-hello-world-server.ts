import { serve } from 'https://deno.land/std@0.170.0/http/mod.ts';
serve(() => new Response('Hello world!'), { port: 8000 });

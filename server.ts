import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`http://127.0.0.1:5000`);

await app.listen({ port: 5000 });
let file = await Deno.open('Deno.txt');
await Deno.copy(file, Deno.stdout);
file.close;
//console.log(file);

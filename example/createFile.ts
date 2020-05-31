const encoder = new TextEncoder();

const text = encoder.encode('Hello Deno');

await Deno.writeFile('Deno.txt', text);

console.log(text);

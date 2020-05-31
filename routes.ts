import { Router } from 'https://deno.land/x/oak/mod.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Book } from './types.ts';

const router = new Router();

let books: Book[] = [
    {
        id: "1",
        title: "Amazon Web Service",
        author: "Amazon"
    },
    {
        id: "2",
        title: "Azure",
        author: "Microsoft"
    },
    {
        id: "1",
        title: "Google Cloud Platform",
        author: "Google"
    },
];


router.get('/', context => {
    context.response.body = "Hello Deno!";
})
    .get('/books', context => {
        context.response.body = books;
    })
    .post('/books', async ({ request, response }) => {
        // 제일 상위 단계가 아니라면 async로 감싸줘야한다.
        const body = await request.body(); 

        if(!request.hasBody){
            response.status = 400;
            response.body = "데이터가 존재하지 않습니다.";
        } else{
            const book: Book = body.value;
            book.id = v4.generate();
            books.push(book);
            response.status = 200;
            response.body = books;
        }
    })
    .get('/book/:id', async({ response, params }) => {
        const book: Book | undefined = books.find(v => {
            return v.id === params.id;
        });
        if(book){
            response.body = book;
            response.status = 200;
        } else{
            response.body = '책을 찾지 못했습니다.';
            response.status = 404;
        }
    })

export default router;
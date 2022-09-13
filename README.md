### JS-Router is a simple router for Request/Response Pair

#### Works for any JS runtime that implements Fetch Request/Response Objects (Deno, Service Worker, Bun)
# Getting Started

Creating Router

```ts
import Router from "./src/index.ts";

const router = new Router;
```
Creating a Route
```ts
const users = [
    { name: "Filan Fisteku", id: "2", },
    { name: "Thash Mthe", id: "3", }
];

class User {
    @Get("/all")
    getAll(request: Request) {

        return new Response(JSON.stringify(users), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200,
        });
    }
}

router.add("/users", User);
```
Resolve Request
```ts
const request = new Request('https://www.example.com/users/all');

router.resolve(request).then(response => {
    if(!response) {}
    /// do something with the reponse
});
```

Combine Multiple Routers
```ts
const otherRouter = new Router;

class Product {
    @Get("/:id")
    getProduct(request: Request) {
        const { id } = new URLPattern({ pathname: "/product/:id" }).exec(new URL(request.url))?.pathname.groups!;

        return new Response("No Products", {
            status: 400,
        })
    }
}

otherRouter.add("/product", Product);

const combinedRouter = Router.combine(router, otherRouter); 

const otherRequest = new Request('https://www.example.com/product/100', { method: "GET" });

combinedRouter.resolve(otherRequest)..then(response => {
    if(!response) {}
    /// do something with the reponse
});

```

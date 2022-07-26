import { assertEquals, } from "https://deno.land/std@0.149.0/testing/asserts.ts";
import Router, { Get } from "../src/index.ts";

const users = [
    { name: "Filan Fisteku", id: "2", },
    { name: "Thash Mthe", id: "3", }
];

const products = [
    {
        name: "MM",
        id: "7",
    },
    {
        name: "Iphone",
        id: "78"
    }
]



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

class Product {
    @Get("/:id")
    getProduct(request: Request) {
        const { id } = new URLPattern({ pathname: "/product/:id" }).exec(new URL(request.url))?.pathname.groups!;
        for (let product of products) {
            if (product.id === id) {
                return new Response(JSON.stringify(product), {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            }
        }

        return new Response(`Product with id:${id} not found`, {
            status: 400,
        })
    }

}

Deno.test("resolve() should resolve the correct Response", async () => {
    const router = new Router;
    router.add("/users", User);

    const request = new Request('https://www.example.com/users/all', { method: "GET" });

    const response = await router.resolve(request);

    assertEquals(await response?.json(), users);
});

Deno.test("combine() should create a new Router and the resolve() method  should resolve the correct Response",
    async () => {
        const router1 = new Router;
        router1.add("/users", User);

        const router2 = new Router;
        router2.add("/product", Product);

        const router3 = Router.combine(router1, router2);

        const request = new Request('https://www.example.com/product/100', { method: "GET" });


        const response = await router3.resolve(request);

        assertEquals(response?.ok, false);
    },
)








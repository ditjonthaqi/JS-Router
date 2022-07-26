
type HTTPMethod = "GET" | "POST" | "PUT"| "DELETE" | "OPTIONS" | "HEAD" | "PATCH";
type RequestHanlder = (request: Request) => Response | Promise<Response>;

interface Endpoint {
    method: HTTPMethod,
    name: string;
    path: string;
}

interface Route { }

interface Router {
    add(path: string, route: { new(): Route }): this;
    resolve(request: Request): Promise<Response | null>;
}



function createHTTPMethodDecorator(method: HTTPMethod) {
    return function (path: string) {
        function hook(
            target: Object,
            key: string,
            descriptor: TypedPropertyDescriptor<(request: Request) => Response>
        ): typeof descriptor;
        function hook(
            target: Object,
            key: string,
            descriptor: TypedPropertyDescriptor<(request: Request) => Promise<Response>>,
        ): typeof descriptor;
        function hook(
            target: Object,
            key: string,
            descriptor: TypedPropertyDescriptor<RequestHanlder>,
        ): typeof descriptor;
        function hook(
            target: Object,
            key: string,
            descriptor: TypedPropertyDescriptor<any>,
        ): typeof descriptor {

            const endpoint: Endpoint = {
                method,
                name: key,
                path,
            }

            if (!("endpoints" in target.constructor)) {
                Reflect.defineProperty(target.constructor, "endpoints", {
                    value: []
                });
            }

            (<{ endpoints: Endpoint[] } & Function>target.constructor).endpoints.push(endpoint);

            return descriptor;
        }
        return hook
    }
}


export default class JRouter implements Router {

    private routes = new Map<URLPattern,
        { handler: string, method: string, path: string, route: { new(): Route } }>();

    add(path: string, route: { new(): Route }): this {
        const endpoints = Reflect.get(route, "endpoints") as Endpoint[] ?? [];
        for (let endpoint of endpoints) {

            let fullPath = path + endpoint.path;

            this.routes.set(new URLPattern({ pathname: fullPath }), {
                path: fullPath,
                method: endpoint.method,
                handler: endpoint.name,
                route,
            });
        }
        return this;
    }

    async resolve(request: Request): Promise<Response | null> {
        const url = new URL(request.url);
        for (let [pattern, { path, method, handler, route }] of this.routes) {

            if (!(pattern.test(url.href)) || method !== request.method) {
                continue;
            }
            const Route = new route
            return await Reflect.get(Route, handler).call(Route, request);
        }

        return null;
    }

    static combine(...routers: JRouter[]): Router {

        const newRouter = new JRouter();
        let routes = [];
        for (let router of routers) {
            routes.push(...router.routes);
        }

        newRouter.routes = new Map([...routes]);

        return newRouter;
    }

}

export const Get = createHTTPMethodDecorator("GET");
export const Post = createHTTPMethodDecorator("POST");
export const Put = createHTTPMethodDecorator("PUT");
export const Delete = createHTTPMethodDecorator("DELETE");
export const Options = createHTTPMethodDecorator("OPTIONS");
export const Patch = createHTTPMethodDecorator("PATCH");
export const Head = createHTTPMethodDecorator("HEAD");









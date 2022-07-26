function createHTTPMethodDecorator(method) {
    return function (path) {
        function hook(target, key, descriptor) {
            const endpoint = {
                method,
                name: key,
                path,
            };
            if (!("endpoints" in target.constructor)) {
                Reflect.defineProperty(target.constructor, "endpoints", {
                    value: []
                });
            }
            target.constructor.endpoints.push(endpoint);
            return descriptor;
        }
        return hook;
    };
}
export default class JRouter {
    routes = new Map();
    add(path, route) {
        const endpoints = Reflect.get(route, "endpoints") ?? [];
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
    async resolve(request) {
        const url = new URL(request.url);
        for (let [pattern, { path, method, handler, route }] of this.routes) {
            if (!(pattern.test(url.href)) || method !== request.method) {
                continue;
            }
            const Route = new route;
            return await Reflect.get(Route, handler).call(Route, request);
        }
        return null;
    }
    static combine(...routers) {
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

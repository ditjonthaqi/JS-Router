declare type RequestHanlder = (request: Request) => Response | Promise<Response>;
interface Route {
}
interface Router {
    add(path: string, route: {
        new (): Route;
    }): this;
    resolve(request: Request): Promise<Response | null>;
}
export default class JRouter implements Router {
    private routes;
    add(path: string, route: {
        new (): Route;
    }): this;
    resolve(request: Request): Promise<Response | null>;
    static combine(...routers: JRouter[]): Router;
}
export declare const Get: (path: string) => {
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Response>): TypedPropertyDescriptor<(request: Request) => Response>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Promise<Response>>): TypedPropertyDescriptor<(request: Request) => Promise<Response>>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<RequestHanlder>): TypedPropertyDescriptor<RequestHanlder>;
};
export declare const Post: (path: string) => {
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Response>): TypedPropertyDescriptor<(request: Request) => Response>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Promise<Response>>): TypedPropertyDescriptor<(request: Request) => Promise<Response>>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<RequestHanlder>): TypedPropertyDescriptor<RequestHanlder>;
};
export declare const Put: (path: string) => {
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Response>): TypedPropertyDescriptor<(request: Request) => Response>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Promise<Response>>): TypedPropertyDescriptor<(request: Request) => Promise<Response>>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<RequestHanlder>): TypedPropertyDescriptor<RequestHanlder>;
};
export declare const Delete: (path: string) => {
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Response>): TypedPropertyDescriptor<(request: Request) => Response>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Promise<Response>>): TypedPropertyDescriptor<(request: Request) => Promise<Response>>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<RequestHanlder>): TypedPropertyDescriptor<RequestHanlder>;
};
export declare const Options: (path: string) => {
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Response>): TypedPropertyDescriptor<(request: Request) => Response>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Promise<Response>>): TypedPropertyDescriptor<(request: Request) => Promise<Response>>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<RequestHanlder>): TypedPropertyDescriptor<RequestHanlder>;
};
export declare const Patch: (path: string) => {
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Response>): TypedPropertyDescriptor<(request: Request) => Response>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Promise<Response>>): TypedPropertyDescriptor<(request: Request) => Promise<Response>>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<RequestHanlder>): TypedPropertyDescriptor<RequestHanlder>;
};
export declare const Head: (path: string) => {
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Response>): TypedPropertyDescriptor<(request: Request) => Response>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<(request: Request) => Promise<Response>>): TypedPropertyDescriptor<(request: Request) => Promise<Response>>;
    (target: Object, key: string, descriptor: TypedPropertyDescriptor<RequestHanlder>): TypedPropertyDescriptor<RequestHanlder>;
};
export {};
//# sourceMappingURL=index.d.ts.map
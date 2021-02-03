import express, { Request, Response } from "express";
import next from "next";
import { router } from "./router";
const dev: boolean = process.env.NODE_ENV !== "production";
const app: any = next({ dev });
const handle: any = app.getRequestHandler();
const port: number = parseInt(process.env.PORT) || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    const isMobile = (req: Request): Boolean => {
      var ua = req.header("user-agent");
      const isMobile = /mobile/i.test(ua);
      return isMobile;
    };
    const createRouterPath = (routerPath): any => {
      server.get(routerPath.as, (req: Request, res: Response) => {
        app.render(req, res, routerPath.file, {
          ...req.params,
          ...req.query,
          isMobile: isMobile(req).toString(),
        });
      });
    };
    createRouterPath(router.user.list);
    createRouterPath(router.permission.list);
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

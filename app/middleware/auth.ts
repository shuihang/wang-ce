
import { Context, EggAppConfig, Application } from 'egg';
export default function authMiddleWare(
  options: EggAppConfig['auth'],
  app: Application,
): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    // 获取当前路由
    const url: string = ctx.url.split('?')[0];
    // 判断当前路由是否需要验证token
    const flag: boolean = options.routerAuth.includes(url);
    if (flag) {
      // 不需要验证token
      await next();
      return;
    }
    // 获取token,如果没有传入token，则为空
    const token: string | undefined = ctx.request.headers.authorization;
    if (!token) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        message: '未授权！',
        data: null,
      };
      await next();
      return;
    }
    // 把Bearer 截取掉，解析的时候不需要加上Bearer
    // 解析token
    try {
      ctx.state.userinfo = app.jwt.verify(token.substring(7), ctx.app.config.jwt.secret);
      // console.log(11, ctx.state.userinfo);
      await next();
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        status: 401,
        message: '登陆过期！',
        data: null,
      };
    }
  };
}

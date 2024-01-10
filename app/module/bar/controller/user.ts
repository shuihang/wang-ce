import { EggAppConfig } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPQuery, Context, EggContext } from '@eggjs/tegg';
import { HelloService } from '@/module/foo';

@HTTPController({
  path: process.env.ROUTER_HEAD || '/',
})
export class UserController {
  @Inject()
  helloService: HelloService;
  @Inject()
  config: EggAppConfig;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'user',
  })
  async user(@Context() ctx: EggContext, @HTTPQuery({ name: 'userName' }) userName: string) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await ctx.app.mysql.get('user', { userName });
    // console.log(111, this.config);
    ctx.body = user;
    // return await this.helloService.hello(userName);
  }
}

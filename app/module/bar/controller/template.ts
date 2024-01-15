
import { EggAppConfig } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPQuery, Context, EggContext } from '@eggjs/tegg';
import { HelloService } from '@/module/foo';

@HTTPController({
  path: process.env.ROUTER_HEAD,
})
export class TemplateController {
  @Inject()
  helloService: HelloService;
  @Inject()
  config: EggAppConfig;
  // 查
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'getTemplateData',
  })
  async find(@Context() ctx: EggContext, @HTTPQuery({ name: 'userName' }) userName: string) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await ctx.app.mysql.get('user', { userName });
    const template = await ctx.model.Test.find({});
    console.log('getTemplateData', template);
    // ctx.validate({
    //   type: 'userName',
    //   isAdmin: true,
    // });
    ctx.body = user;
    // return await this.helloService.hello(userName);
  }
  // 增
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: 'insertTemplate',
  })
  async insert(@Context() ctx: EggContext) {
    return await ctx.model.Test.create({
      name: 'wq_test',
    });
  }
}

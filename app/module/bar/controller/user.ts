
import { EggAppConfig, EggLogger } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, Context, EggContext } from '@eggjs/tegg';
import { UserService } from '@/module/foo';

@HTTPController({
  path: process.env.ROUTER_HEAD + '/user',
})
export class UserController {
  @Inject()
  readonly userService: UserService;
  @Inject()
  readonly logger: EggLogger;
  @Inject()
  readonly config: EggAppConfig;

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'login',
  })
  async login(@Context() ctx: EggContext) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    // const user = await ctx.app.mysql.get('user', { phone_number });
    console.log(11, ctx.request.body);
    try {
      ctx.validate({ phoneNumber: 'phoneNumber' });
    } catch (error) {
      ctx.body = error;
      return;
    }
    // 验证通过，可以进行后续操作
    // 生成token
    const { secret, expiresIn } = ctx.app.config.jwt;
    const token: string = ctx.app.jwt.sign(ctx.request.body, secret, { expiresIn });
    ctx.body = { status: 200, message: '登陆成功！', data: { userInfo: {}, token: 'Bearer ' + token } };
    // return await this.userService.hello(userName);
  }
}

'use strict';
import { Controller } from 'egg';
class TestController extends Controller {
  // 查询用户
  async index() {
    // 建议将操作数据库的方法放到service里
    // const userList = await this.ctx.model.Test.find({});
    // console.log(4444, this.ctx.model);
    this.ctx.body = '用户列表页面';
  }
}

module.exports = TestController;

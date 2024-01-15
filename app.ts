import { Application, IBoot } from 'egg';
import { ROUTER_HEAD, UPLOAD_DIR } from './config/env';
import { join } from 'path';

export default class FooBoot implements IBoot {
  readonly app: Application;
  constructor(app: Application) {
    this.app = app;
  }
  configWillLoad() {
    // 准备调用configDidLoad，
    // Config、plugin文件被引用，
    // 这是修改配置的最后机会。
    process.env.ROUTER_HEAD = ROUTER_HEAD;
    process.env.UPLOAD_DIR = UPLOAD_DIR;
  }
  configDidLoad() {
    // Config, plugin 文件已加载。
    /* 导入验证规则 */
    const directory = join(this.app.baseDir, 'app/module/bar/validate');
    // console.log('导入验证规则', directory);
    this.app.loader.loadToApp(directory, 'validate');
  }
  async didLoad() {
    // 所有文件都已加载，请在此处启动插件。
  }
  async willReady() {
    // 所有插件都已经启动，可以在应用程序准备好之前做一些事情。
  }
  async didReady() {
    // 工人准备好了，可以做一些事情
    // 不需要阻止应用程序启动。
  }
  async serverDidReady() {
    // 服务器正在侦听。
  }
  async beforeClose() {
    // 在应用程序关闭之前做一些事情。
  }
}

// module.exports = (app: Application) => {
//   app.beforeStart(async () => {
//     // 设置环境变量
//     process.env.ROUTER_HEAD = routerHead;
//     // 从配置中心获取 MySQL 的配置
//     // { host: 'mysql.com', port: '3306', user: 'test_user', password: 'test_password', database: 'test' }
//     // const mysqlConfig = await app.configCenter.fetch('mysql');
//     // app.database = app.config.mysql.createInstance(mysqlConfig);
//   });
// };

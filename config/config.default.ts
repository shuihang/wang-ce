import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { ROUTER_HEAD } from './env';

export default (appInfo: EggAppInfo) => {
  const config = exports = {
    security: {
      /* csrf 安全 */
      csrf: {
        enable: false,
      },
    },
    /* 跨域*/
    cors: {
      origin: '*', // 域名+端口 或者  *(全匹配)
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    /* 上传文件 */
    multipart: {
      mode: 'file',
    },
    cluster: {
      listen: {
        path: '',
        port: 9100,
        hostname: '0.0.0.0',
      },
    },
    mongoose: {
      client: {
        // url: 'mongodb://root:cjx6Ufg8UFoQRtBMx@39.100.76.235:27017/cjx-cli',
        url: 'mongodb://127.0.0.1:27018/cjx-cli',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          authSource: 'admin', // 权限认证（添加这个属性！！！！！）
        },
      },
      app: true,
      agent: false,
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '39.100.76.235',
        // 端口号
        port: '3306',
        // 用户名
        user: 'protectbys',
        // 密码
        password: 'FxahG5hfPNkzPbWG',
        // 数据库名
        database: 'protectbys',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    /* 校验 */
    validate: {
      // convert: true,
      // widelyUndefined: true,
    },
    jwt: {
      secret: 'wang_ce_cjx_bys', // 不能设置为123456
      enable: true, // default is false
      match: '/jwt', // optional
      expiresIn: 60,
    },
  } as PowerPartial<EggAppConfig>;

  // 覆盖framework/plugin中的配置
  // config.security
  // 用于cookie签名密钥，应更改为您自己的并保持安全
  config.keys = appInfo.name + '_1704794471847_8078';

  // 在此处添加您的 egg 中间件配置
  config.middleware = [ 'auth' ];
  // 在此处添加您的特殊配置
  const bizConfig = {
    // sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    auth: {
      name: 'auth',
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      routerAuth: [ `${ROUTER_HEAD}/user/login`, `${ROUTER_HEAD}/user/register`, `${ROUTER_HEAD}/user/logout` ],
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};


import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
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
  } as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1704794471847_8078';

  // add your egg config in here
  config.middleware = [];
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};


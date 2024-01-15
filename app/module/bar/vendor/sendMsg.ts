import Core from '@alicloud/pop-core';
import { EggContext } from '@eggjs/tegg';

// eslint-disable-next-line @typescript-eslint/no-var-requires
let transporter;

// 创建发送短信对象
const createTransporterInstance = (ctx: EggContext) => {
  if (transporter) {
    return transporter;
  }
  transporter = new Core({
    accessKeyId: ctx.app.config.sms.accessKeyId,
    accessKeySecret: ctx.app.config.sms.accessKeySecret,
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
  });
  return transporter;
};

// 创建需要发送的内容
export const createSmsInfo = (ctx: EggContext, receiver:string) => {
  // 1.生成验证码
  const code = Math.random().toString(16).slice(2, 6)
    .toUpperCase();
  const jsonCode = { code };
  // 2.生成发送内容
  const info = {
    SignName: '小灰灰',
    TemplateCode: 'SMS_247900215',
    PhoneNumbers: receiver,
    TemplateParam: JSON.stringify(jsonCode),
  };
  // 3.保存验证码
  ctx.session.sms = {
    code,
    expire: Date.now() + 60 * 1000, // 验证码1分钟之后过期
  };
  return info;
};

// 发送短信
export const sendSmsCode = (ctx: EggContext, receiver:string) => {
  const transporter = createTransporterInstance(ctx);
  const info = createSmsInfo(ctx, receiver);
  const requestOption = {
    method: 'POST',
  };
  return new Promise((resolve, reject) => {
    transporter.request('SendSms', info, requestOption).then(result => {
      resolve(result);
    }, ex => {
      reject(ex);
    });
  });
};
export const verifySmsCode = (ctx: EggContext, clientCode) => {
  // 1.取出服务端中保存的验证码和过期时间
  const serverCaptcha = ctx.session.sms;
  let serverCode;
  let serverExpire;
  try {
    serverCode = serverCaptcha.code;
    serverExpire = serverCaptcha.expire;
  } catch (e) {
    throw new Error('请重新获取验证码');
  }
  // 2.验证码是否过期
  if (Date.now() > serverExpire) {
    throw new Error('验证码已经过期');
  } else if (serverCode !== clientCode) {
    throw new Error('验证码不正确');
  }
  // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
  ctx.session.email = null;
};

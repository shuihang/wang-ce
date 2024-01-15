
import { Application } from 'egg';

module.exports = (app: Application) => {
  const { validator } = app;
  // 校验 手机号是否正确
  validator.addRule('phoneNumber', (rule, value) => {
    if (!/^1[3-9]\d{9}$/.test(value)) {
      return '请输入正确的手机号';
    }
  });
};

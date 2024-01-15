import { Application } from 'egg';

module.exports = (app: Application) => {
  const { validator } = app;
  // 校验用户名是否正确
  validator.addRule('userName', (rule, value) => {
    console.log('校验用户名', rule, value);
    if (/^\d+$/.test(value)) {
      return '用户名应该是字符串';
    } else if (value.length < 3 || value.length > 10) {
      console.log('用户名的长度应该在3-10之间');
      return '用户名的长度应该在3-10之间';
    }
  });
};

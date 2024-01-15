import { Application } from 'egg';

module.exports = (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 数据库表映射
  const TestSchema = new Schema({
    // 标题
    title: {
      type: String,
      required: true,
    },
    // 副标题
    desc: {
      type: Number,
      required: true,
    },
    // 未发布内容 id，内容存储在mongodb 中
    contentId: {
      type: String,
    },
    // 发布内容 id，内容存储在mongodb 中，未发布的为空
    publishContentId: {
      type: String,
    },
    // 作者 username，和用户表关联
    author: {
      type: String,
      required: true,
    },
    // 封面图片 url
    coverImg: {
      type: String,
      default: 'http://wang_ce/public/default_cover.png',
    },
    // 是否模板
    isTemplate: {
      type: Boolean,
      default: false,
    },
    // 状态：口-删除，1-末发布，2-发布，3-强制下线
    status: {
      type: Number,
      default: 0,
    },
    // 模板被使用的次数
    copiedCount: {
      type: Number,
      default: 0,
    },
    // 最近一次发布的时间
    latestPublishAt: {
      type: Date,
      default: Date.now(),
    },
    // hot 标签，模板使用
    isHot: {
      type: Boolean,
      default: false,
    },
    // new标签，模板使用
    isNew: {
      type: Boolean,
      default: false,
    },
    // 排序参数
    orderIndex: {
      type: Number,
      default: 0,
    },
    // 模版是否公开显示
    isPublic: {
      type: Boolean,
      default: false,
    },
  });
  return mongoose.model('Test', TestSchema, 'template');
};

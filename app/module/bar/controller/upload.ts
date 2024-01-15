import { EggAppConfig } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, Context, EggContext } from '@eggjs/tegg';
import { HelloService } from '@/module/foo';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

interface EggFile {
  field: string;
  filename: string;
  encoding: string;
  mime: string;
  filepath: string;
}

@HTTPController({
  path: process.env.ROUTER_HEAD,
})
export class UploadController {
  @Inject()
  helloService: HelloService;
  @Inject()
  config: EggAppConfig;
  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: 'uploadFile',
  })
  async upload(@Context() ctx: EggContext) {
    // console.log(ctx.request);
    // 获取前端传过来的第一个文件 如果前端传过来的是多个文件 就要选择遍历的方式去过去每个文件
    const file: EggFile = ctx.request.files[0];
    // 给文件命名 以时间戳命名，避免重复
    const filename: string = new Date().getTime() + '_' + file.filename;
    const url: string = resolve(process.env.UPLOAD_DIR || '', filename);
    // 读取文件流 写入文件流
    writeFileSync(url, readFileSync(file.filepath));
    return {
      status: 200,
      message: '上传成功',
      data: {
        filePath: `/public/uploads/${filename}`,
      },
    };
    // return await this.helloService.hello(userName);
  }
}

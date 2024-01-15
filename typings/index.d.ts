import 'egg';
import { Application, EggContext, Context, IgnoreOrMatch } from 'egg';
import * as mongoose from 'mongoose';
import { SignOptions, SignCallback, VerifyOptions, VerifyCallback } from 'jsonwebtoken';

interface CheckHandlerFunc {
  (rule: any, value: any): string | void;
}

interface ValidateError {
  code: string;
  field?: string;
  message: string;
}

declare module 'egg' {
  type ModelKeys = 'Test' | 'Template'| 'Article';
  
  type MongooseModels = {
    [key in ModelKeys]: mongoose.Model<any>
  };
  
  type MongooseSingleton = {
    clients: Map<string, mongoose.Connection>,
    get (id: string) : mongoose.Connection
  };
  
  type MongooseConfig = {
    url: string,
    options?: mongoose.ConnectOptions
  };
  
  // extend app
  interface Application {
    mysql: any,
    mongooseDB: mongoose.Connection | MongooseSingleton;
    mongoose: typeof mongoose;
    model: MongooseModels;
    validator: {
      addRule: (type: string, check: RegExp | CheckHandlerFunc) => void;
      validate: (rules: any, data: any) => ValidateError[];
    };
    jwt: {
      /**
       * 调用jsonwebtoken的sign（）方法
       * @param payload 数据。待签名的数据
       * @param secretOrPrivateKey 密钥。字符串或｛key，passphrase｝
       * @param options jwt选项请参阅中的更多详细信息 https://github.com/auth0/node-jsonwebtoken
       * @param callback callback
       */
      sign(
        payload: string | Buffer | object,
        secretOrPrivateKey: string,
        options?: SignOptions,
        callback?: SignCallback
      ): string;
      /**
       * 调用jsonwebtoken的verify（）方法
       * @param token jwt token.
       * @param secretOrPrivateKey 密钥。字符串或｛key，passphrase｝
       * @param options jwt选项请参阅中的更多详细信息 https://github.com/auth0/node-jsonwebtoken
       * @param callback callback
       */
      verify(token: string, secretOrPrivateKey: string, options?: VerifyOptions, callback?: VerifyCallback): string;
      
      /**
       * 调用jsonwebtoken的decode（）方法
       * @param token jwt token
       */
      decode(token: string): string;
    };
  }
  
  // extend context
  interface Context {
    model: MongooseModels;
    validate: (rules: any, data?: any) => void;
  }
  
  // interface EggContext {
  //   validate: (rules: any, data?: any) => void;
  // }
  
  // extend your config
  interface EggAppConfig {
    mongoose: {
      url?: string,
      options?: mongoose.ConnectOptions,
      client?: MongooseConfig,
      clients?: {
        [key: string]: MongooseConfig
      }
    };
    jwt: {
      secret: string;
      expiresIn: number | string;
      enable?: boolean;
      sign?: SignOptions;
      verify?: VerifyOptions;
      ignore?: IgnoreOrMatch;
      match?: IgnoreOrMatch;
    };
    routerAuth: string[];
  }
}



declare module 'egg' {

}

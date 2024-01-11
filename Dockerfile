# Dockerfile来安装和配置RabbitMQ。
FROM node:21
WORKDIR /app
COPY . /app

# 设置时区
RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone

# 安装RabbitMQ依赖
RUN rm -rf node_modules
RUN rm -rf .pnpm-store
# RUN npm install pnpm -g
# RUN pnpm config set registry https://registry.npmmirror.com
RUN npm install
# RUN pnpm run tsc

# 启动
CMD echo $SERVER_NAME && echo $AUTHOR_NAME && npm run dev

# 环境变量
ENV SERVER_NAME='server'
ENV AUTHOR_NAME='cjx'

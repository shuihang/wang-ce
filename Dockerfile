# Dockerfile来安装和配置RabbitMQ。
FROM node:21
WORKDIR /app
COPY . /app

# 设置时区
RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone

# 安装RabbitMQ依赖
RUN npm install pnpm -g
RUN pnpm install
#RUN npm run tsc

# 启动
CMD echo $SERVER_NAME && echo $AUTHOR_NAME && npm run dev

# 环境变量
ENV SERVER_NAME='server'
ENV AUTHOR_NAME='cjx'

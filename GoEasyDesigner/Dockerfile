# 使用 Node.js 官方的 Node 镜像作为基础
FROM node:14-alpine
# 设置工作目录
WORKDIR /app
# 将 package.json 和 package-lock.json 复制到容器中
COPY ./frontend ./
# 安装项目依赖
RUN npm ci --only=production
# 暴露端口
EXPOSE 4173
# 运行命令
CMD ["npm", "run", "preview"]
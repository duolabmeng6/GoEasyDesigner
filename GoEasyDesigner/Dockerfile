FROM node:18-alpine
WORKDIR /app
COPY ./frontend .

RUN npm install --registry=http://registry.npmmirror.com
RUN npm run build

# docker build -t my-node-app .
# docker run -v ./frontend:/app -p 3000:3000 -it --rm --name my-running-app my-node-app /bin/sh

FROM nginx:alpine-slim
COPY --from=0 /app/dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3005
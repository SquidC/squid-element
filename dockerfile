# 基于nginx创建
FROM nginx:1.17.9

WORKDIR /

RUN mkdir /usr/share/nginx/static/

# 打包好bundle
COPY ./website/dist/  /usr/share/nginx/html/
# 静态文件
COPY ./website/public/  /usr/share/nginx/static/

# 修改nginx配置
COPY ./build/nginx.conf /etc/nginx/

# 暴露端口映射
EXPOSE 80
EXPOSE 443

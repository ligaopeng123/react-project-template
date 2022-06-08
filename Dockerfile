# 从镜像服务中拉取镜像
FROM xxx/component/nginx:latest
# 权限校验
LABEL maintainer="xxx"
# 编译目录
COPY build  /webapp
# 复制内容
RUN chmod 777 -R /webapp && chown nginx:nginx -R /webapp
# 复制nginx配置
COPY conf/nginx.${PROJECT_ENV}.conf /etc/nginx/nginx.conf

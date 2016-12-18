# Production dockerfile (post jspm gulp build)
FROM nginx:alpine
COPY deploy-webeditor /usr/share/nginx/html

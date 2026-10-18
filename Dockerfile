FROM nginx:1.27-alpine

# Static site: copy everything that is not excluded by .dockerignore
COPY . /usr/share/nginx/html

EXPOSE 80

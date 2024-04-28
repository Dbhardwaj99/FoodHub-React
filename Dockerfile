FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove any existing default content
RUN rm -rf ./*

COPY dist/ .

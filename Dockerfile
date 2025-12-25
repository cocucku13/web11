# Build stage: install node tools and minify assets
FROM node:18-alpine AS build
WORKDIR /app
RUN apk add --no-cache bash
COPY package.json ./package.json
RUN npm install --silent
COPY . .
RUN npm run build || true

# Final stage: nginx serving optimized site
FROM nginx:alpine
LABEL maintainer="dev"
COPY --from=build /app /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

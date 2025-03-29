# Stage 1: Build the Angular app
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./

# Set a fallback registry and increase timeout
RUN npm config set registry https://registry.npmmirror.com && \
    npm install --legacy-peer-deps --network-timeout 600000

COPY . .
RUN npm run build --prod

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/gym-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
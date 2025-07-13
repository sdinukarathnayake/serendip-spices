# 1. Builder stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Nginx stage
FROM nginx:stable-alpine

# remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
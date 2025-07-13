# 1. Build stage
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production

# 2. Runtime stage
FROM node:18-alpine
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 4302

CMD ["node", "server.js"]
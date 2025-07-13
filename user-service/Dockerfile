# 1. Build stage (install deps)
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production

# 2. Runtime stage
FROM node:18-alpine
WORKDIR /app

# copy only production node_modules
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# expose the port your app listens on
EXPOSE 4301

# default start command
CMD ["node", "server.js"]

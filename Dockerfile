# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps, build, and generate Prisma client
COPY package*.json ./
COPY env.public ./.env
RUN npm ci
COPY prisma ./prisma
COPY . .
RUN npx prisma generate
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev 

# Copy build output and Prisma artifacts
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# On container start, apply migrations then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]


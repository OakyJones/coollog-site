FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV DATABASE_URL="file:/app/data/refilog.db"
RUN npx prisma generate
RUN npx next build
RUN npx tsx --version && node -e "require('esbuild').buildSync({entryPoints:['prisma/seed.ts'],bundle:true,platform:'node',outfile:'prisma/seed.js',external:['@prisma/client']})"

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="file:/app/data/refilog.db"

RUN mkdir -p /app/data
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy compiled seed script
COPY --from=builder /app/prisma/seed.js ./prisma/seed.js
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.js 2>/dev/null; npx next start"]

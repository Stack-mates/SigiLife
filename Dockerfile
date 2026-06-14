# SigiLife — production image (self-hosted, ADR-012).
# Multi-stage: install deps → build standalone → minimal runtime.
# Uses Next.js output:"standalone" (next.config.ts) for a small final image.

# ---- deps ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Prisma client must be generated before the Next build.
RUN npx prisma generate
RUN npm run build

# ---- runtime ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Next standalone server listens on PORT (default 3000).
ENV PORT=3000
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Standalone server + static assets + public files.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
# Prisma engine + schema for runtime migrate/generate if needed.
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/prisma ./prisma

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

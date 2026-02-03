FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

FROM base AS deps
COPY package.json pnpm-lock.yaml .npmrc ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build && pnpm prune --prod

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
RUN corepack enable pnpm
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/redirects.js ./redirects.js
USER nextjs
EXPOSE 3000
CMD ["pnpm", "start"]

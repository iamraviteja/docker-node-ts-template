# Use NodeJS server for the app.
FROM node:18

# Copy files as a non-root user. The `node` user is built in the Node image.
WORKDIR /usr/src/app
RUN chown node:node ./
USER node

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Install dependencies first, as they change less often than code.
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN npm run build

EXPOSE 8080

# Execute NodeJS (not NPM script) to handle SIGTERM and SIGINT signals.
CMD ["node", "dist/src/index.js"]
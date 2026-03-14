FROM node:20-slim

# Build deps for native modules (better-sqlite3)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies (no lockfile — resolves platform-specific optionals correctly)
COPY package.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "exec node_modules/.bin/next start -p ${PORT:-3000}"]

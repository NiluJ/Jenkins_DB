FROM node:20-alpine

WORKDIR /app

# Copy backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy full source code
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Move build into backend
RUN cp -r frontend/dist backend/dist

WORKDIR /app/backend

EXPOSE 5000

CMD ["node", "server.js"]
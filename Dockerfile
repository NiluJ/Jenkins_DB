FROM node:20

WORKDIR /app

COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies and build frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Copy frontend build into backend
RUN cp -r dist ../backend/

# Run backend
WORKDIR /app/backend

EXPOSE 5000

CMD ["node", "server.js"]
# Stage 1: Setup the backend
FROM node:20.17.0-bookworm

# Set working directory for the runtime stage
WORKDIR /app

# Copy the server files
COPY ./server /app/server

# Install backend dependencies
RUN cd server && npm install --production

# Expose the port that the server will run on
EXPOSE 3001

# Start the backend server
CMD ["node", "server/index.js"]
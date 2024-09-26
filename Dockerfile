# Stage 1: Build React App
FROM node:20.17-bullseye AS build

# Set working directory for the build stage
WORKDIR /app

# Copy package.json and package-lock.json files for both client and server
COPY ./client/package.json ./client/package-lock.json ./client/
COPY ./server/package.json ./server/package-lock.json ./server/

# Install dependencies for both client and server
RUN cd client && npm install
RUN cd server && npm install

# Copy the React app source code to the build directory
COPY ./client /app/client

# Build the React app for production
RUN cd client && npm run build

# Stage 2: Setup the backend
FROM node:18.16.0 AS runtime

# Set working directory for the runtime stage
WORKDIR /app

# Copy only the server files
COPY ./server /app/server

# Install backend dependencies
RUN cd server && npm install --production

# Copy the built React app from the previous stage into the server's static directory
COPY --from=build /app/client/build /app/server/public

# Expose the port that the server will run on
EXPOSE 3001

# Set environment variables (if any)
ENV NODE_ENV=production

# Start the server
CMD ["node", "server/index.js"]

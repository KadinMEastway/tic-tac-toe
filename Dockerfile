# Test web app that returns the name of the host/pod/container servicing req
FROM node:current-alpine

LABEL org.opencontainers.image.authors="@kadinmeastway"

# Create directory in container image for app code
RUN mkdir -p /usr/src/app

# Set working directory context
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies from package.json
RUN npm install

# Copy the rest of the app source code (.) to /usr/src/app in container image
COPY . .

# Expose the port the app runs on (React's default port is 3000)
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "start"]
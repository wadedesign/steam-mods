# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 12032

# Set the environment variable to specify the port
ENV PORT 12032

# Start the Next.js application
CMD ["npm", "run", "start"]


# Build the Docker image
# docker build -t steam-mods .

# Run the Docker container
# docker run -p 12032:12032 steam-mods
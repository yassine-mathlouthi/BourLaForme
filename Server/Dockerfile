# Step 1: Use the official Node.js 20 image to build the backend
FROM node:20 AS build-backend
# Set the working directory inside the container
WORKDIR /app
# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./
# Install the backend dependencies
RUN npm install
# Copy the entire backend source code
COPY . .
# Step 2: Create the final image to run the backend
FROM node:20
# Set the working directory inside the container
WORKDIR /app
# Copy the installed node_modules and backend source code from the build stage
COPY --from=build-backend /app /app
# Expose the port your backend is listening on (e.g., 4000)
EXPOSE 4000
# Rebuild bcrypt module inside the container
RUN npm rebuild bcrypt --build-from-source
# Start the Node.js server
CMD ["npm", "start"]

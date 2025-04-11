# Step 1: Use the official Node.js 20 image to build the backend
FROM node:20 AS build-backend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Step 2: Final image
FROM node:20

WORKDIR /app

COPY --from=build-backend /app /app

# Copy .env explicitly into the final image (optional but safer)
COPY .env .env

EXPOSE 4000
RUN npm rebuild bcrypt --build-from-source

CMD ["npm", "start"]

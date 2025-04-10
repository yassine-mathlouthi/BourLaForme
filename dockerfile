# Stage 1: Build the frontend
FROM node:20 AS build-frontend
WORKDIR /frontend
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install
COPY ./client .
RUN npm run build

# Stage 2: Build the backend
FROM node:20 AS build-backend
WORKDIR /backend
COPY ./server/package.json ./server/package-lock.json ./
RUN npm install
COPY ./server .

# Stage 3: Combine both frontend and backend in a single image
FROM node:20

# Backend
WORKDIR /backend
COPY --from=build-backend /backend /backend
WORKDIR /frontend
COPY --from=build-frontend /frontend /frontend

# Expose both frontend (80) and backend (3000) ports
EXPOSE 80
EXPOSE 3000

# Start both frontend and backend
CMD bash -c "npm start --prefix /backend & npm start --prefix /frontend"

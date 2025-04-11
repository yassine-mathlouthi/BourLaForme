# Stage 1: Build the frontend
FROM node:20 AS build-frontend
WORKDIR /frontend
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install --legacy-peer-deps
COPY ./client .
RUN npm run build --prod

# Stage 2: Build the backend
FROM node:20 AS build-backend
WORKDIR /backend
COPY ./Server/package.json ./Server/package-lock.json ./
RUN npm install
COPY ./Server .

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

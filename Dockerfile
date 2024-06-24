# Stage 1: Build the React app
FROM node:20.13-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
COPY .env .env
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

# Step 1: Use a Node.js base image for building
FROM node:18 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use a lightweight NGINX server for production
FROM nginx:alpine

# Step 8: Copy build files to the NGINX directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the default NGINX port
EXPOSE 80

# Step 10: Start NGINX
CMD ["nginx", "-g", "daemon off;"]

# 1. Base image with Node.js
FROM node:20-alpine

# 2. Set app working directory
WORKDIR /app

# 3. Copy package.json files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your project
COPY . .

# 6. Build Next.js
RUN npm run build

# 7. Set environment
ENV NODE_ENV=production

# 8. Expose port
EXPOSE 3000

# 9. Start app
CMD ["npm", "start"]

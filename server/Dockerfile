FROM node:12-alpine
WORKDIR /app
COPY node_modules ./node_modules
COPY dist ./dist
EXPOSE 3000
CMD node dist/app.js

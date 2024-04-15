FROM node:alpine
WORKDIR /sso_implementation
COPY package.json /sso_implementation
RUN yarn
COPY . /sso_implementation
EXPOSE 3000
CMD ["node","index.js"]
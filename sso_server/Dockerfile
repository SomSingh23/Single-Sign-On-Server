FROM node:slim
WORKDIR /sso
COPY package.json /sso
RUN yarn
COPY . /sso
EXPOSE 3031
CMD ["node","index.js"]
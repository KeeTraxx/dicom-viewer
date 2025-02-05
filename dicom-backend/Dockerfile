FROM node:lts

COPY . /app

WORKDIR /app

EXPOSE 4000

RUN npm install

ENTRYPOINT [ "sh", "-c" ]

CMD ["npm start"]
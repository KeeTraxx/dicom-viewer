FROM node:lts

RUN apt-get update && apt-get install -y libcairo2-dev libpango1.0-dev libgif-dev build-essential g++ && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . /app

WORKDIR /app

EXPOSE 5173

RUN npm install

ENTRYPOINT [ "sh", "-c" ]

CMD ["npm run dev"]
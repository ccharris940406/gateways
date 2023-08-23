FROM node:18

WORKDIR /app

COPY ./ ./


RUN npm install

ENV DB_NAME=postgres 
ENV DB_PASSWORD=postgres 
ENV DB_USER=postgres
ENV DB_HOST="localhost:5432"

RUN echo 'DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?schema=public"' >> .env 

CMD [ "npm", "run", "dev" ]

EXPOSE 3000

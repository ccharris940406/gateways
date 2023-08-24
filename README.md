# Gateways

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Database conection

It uses PostgresSQl database, in file .env.test you have a example to configure database connection.

```bash
npx prisma migrate dev
npx prisma db pull

```

### Testing

Run tests

```bash
npm run test
or
yarn test
or
pnpm test
```

### Run

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Docker

You can start the serice using Docker, the file docker-compose.yml has an example.

```bash
docker compose up -d

```

After the container start you have to configure the database.

```bash
docker exec <app container> npx prisma migrate dev
docker exec <app container> npx prisma db pull

```

#### Run testing in docker

To run the tests in docker container.

```bash
docker exec <app container> npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Introduction

This sample project is managing gateways - master devices that control multiple peripheral devices.

## Task description

Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database.

A **Gateway** has:

- unique serial number (string);
- human-readable name (string);
- IPv4 address (to be validated);
- multiple associated peripheral devices;

Each **Peripheral Device** has:

- UID (number);
- vendor (string);
- date created;
- status (online/offline).

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

The service should allow:

- storing a new gateway;
- displaying information about all stored gateways (and their devices);
- displaying details about a single gateway;
- adding and removing a peripheral device from a gateway;

> Feel free to make assumptions for the design approach.

## Requirements

While implementing your solution **please take care of the following requirements**:

### Functional requirements

- There is no need for UI;
- Prevent the gateway from receiving more than 10 peripheral devices;

---

### Non-functional requirements

- Input/output data must be in JSON format;
- Your project must be buildable and runnable;
- Your project must have a README file with build/run/test instructions (use DB that can be run locally, e.g. in-memory, via container);
- Unit tests;
- Use a framework of your choice, but popular, up-to-date, and long-term support versions are recommended.

## Api documentation

### Gateways end points

**@/api/gateways**

#### Get all gateways

```bash
curl --location 'http://<host>:<port>/api/gateways'
```

For get a gateway you have to give the gateway's id

```bash
curl --location 'http://<host>:<port>/api/gateways/<id>'
```

#### Create a gateway

```bash
curl --location 'http://<host>:<port>/api/gateways' \
--header 'Content-Type: application/json' \
--data '{
    "serial": <serial>,
    "name": <name>,
    "ipv4": <ip number>
}'
```

### Pheripheral devs end points

**@/api/pheripheral**

#### Create a pheripheral dev

```bash
curl --location 'http://<host>:<port>/api/pheripheral' \
--header 'Content-Type: application/json' \
--data '{
    "uid":<uid>,
    "vendor": <vendor name>,
    "status": <"ONLINE/OFFLINE">,
    "createDate": <YYYY-MM-DDT00:00:00.000Z>,
    "gatewayId": <gateway id>
}'
```

#### Update a pheripheral

```bash
curl --location --request PUT 'http://<host>:<port>/api/pheripheral/<pheripheral id>,' \
--header 'Content-Type: application/json' \
--data '{
    "gatewayId": <gatheway id>
}'
```

You can remove pheripheral dev from a gateway by passing null to gate:

```bash
curl --location --request PUT 'http://<host>:<port>/api/pheripheral/<pheripheral id>,' \
--header 'Content-Type: application/json' \
--data '{
    "gatewayId": null
}'
```

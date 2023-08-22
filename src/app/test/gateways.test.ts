import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createGateway,
  deleteGateway,
  getGateways,
} from "../services/gateways";

import { prisma } from "../utils/prismaClient";
import { createPheripheralDev, deleteDev } from "../services/pheripheralDev";

describe("Testing Gateways and PheripheralDev", () => {
  it("getGateways should be an object", async () => {
    expect(typeof (await getGateways())).toBe("object");
  });
  it("should be an error create a gateway with an invalid ipv4 number", async () => {
    expect(
      await createGateway({
        serial: "test Serial",
        name: "test Name",
        ipv4: "192.0.256.0",
      })
    ).toStrictEqual({ error: { error: "Invalid ipv4" } });
  });
  it("should be an error create a gateway with a duplicated ipv4", async () => {
    expect(
      await createGateway({
        serial: "Serial 1",
        name: "test Name",
        ipv4: "1.0.0.1",
      })
    ).toStrictEqual({ error: { error: "Error creating a new gateways" } });
  });
  it("should be an error create a gateway with a duplicated Serial", async () => {
    expect(
      await createGateway({
        serial: "Serial -1",
        name: "test Name",
        ipv4: "192.168.0.1",
      })
    ).toStrictEqual({ error: { error: "Error creating a new gateways" } });
  });
  it("should return a gateway if success ", async () => {
    expect(
      await createGateway({
        id: -2,
        serial: "Serial -2",
        name: "test Name",
        ipv4: "1.0.0.2",
      })
    ).toStrictEqual({
      gatewayData: {
        id: -2,
        serial: "Serial -2",
        name: "test Name",
        ipv4: "1.0.0.2",
      },
    });
  });
  it("should return an error if it try to create a dev related with a full gateway (limit)", async () => {
    expect(
      await createPheripheralDev({
        uid: -100,
        vendor: "vendor x",
        gatewayId: -1,
        status: "ONLINE",
        createDate: "2023-08-18T00:00:00.000Z",
      })
    ).toStrictEqual({
      error: { error: "The gateway is full of devs (limit = 10)" },
    });
  });
  it("should return a new pheripheralDev data if success createPheripheralDev"),
    async () => {
      expect(
        await createPheripheralDev({
          id: -101,
          uid: -101,
          vendor: "vendor x",
          status: "ONLINE",
          createDate: "2023-08-18T00:00:00.000Z",
        })
      ).toStrictEqual({
        id: -101,
        uid: -101,
        vendor: "vendor x",
        status: "ONLINE",
        createDate: "2023-08-18T00:00:00.000Z",
      });
    };
  beforeAll(async () => {
    await deleteGateway(-1);
    await deleteGateway(-2);
    await deleteDev(-101);
    const mockedGateway = await mockingGateways();
    console.log("Mocked Gateway", mockedGateway);
  });
  afterAll(async () => {
    await deleteGateway(-1);
    await deleteGateway(-2);
    await deleteDev(-101);
  });
});

async function mockingGateways() {
  const primeGateway = await prisma.gateways.upsert({
    where: {
      id: -1,
    },
    update: {},
    create: {
      id: -1,
      serial: "Serial -1",
      name: "Gateway 1",
      ipv4: "1.0.0.1",
      PheripheralDev: {
        create: [
          {
            uid: -1,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -2,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -3,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -4,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -5,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -6,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -7,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -8,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -9,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -10,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
          {
            uid: -11,
            vendor: "Vendor 1",
            createDate: "2023-08-18T00:00:00.000Z",
            status: "ONLINE",
          },
        ],
      },
    },
  });
  return primeGateway;
}

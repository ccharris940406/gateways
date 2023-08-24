import { Gateway, GatewayResponse } from "../types/gateways";
import { prisma } from "../utils/prismaClient";
import { validateIvp4 } from "../utils/validations";

async function getAGateway(id: number): Promise<GatewayResponse> {
  try {
    const gateway = await prisma.gateways.findUnique({
      where: {
        id: id,
      },
      include: {
        PheripheralDev: true,
      },
    });

    if (!gateway) return { error: { error: "No gateway found" } };
    return { gatewayData: gateway };
  } catch (e) {
    return { error: { error: "Error getting a gateway" } };
  }
}

async function getGateways() {
  const gateways = await prisma.gateways.findMany({
    include: { PheripheralDev: true },
  });
  return gateways;
}

async function createGateway(
  newGatewayData: Gateway
): Promise<GatewayResponse> {
  if (!validateIvp4(newGatewayData.ipv4)) {
    return { error: { error: "Invalid ipv4" } };
  }

  try {
    const newGateway = await prisma.gateways.create({
      data: {
        id: newGatewayData.id ?? newGatewayData.id,
        serial: newGatewayData.serial,
        name: newGatewayData.name,
        ipv4: newGatewayData.ipv4,
      },
    });
    return { gatewayData: newGateway };
  } catch (error) {
    return { error: { error: "Error creating a new gateways" } };
  }
}

async function deleteGateway(id: number) {
  try {
    const deletedGateway = await prisma.gateways.delete({
      where: { id: id },
    });
    return deletedGateway.serial;
  } catch (error) {
    return "-1";
  }
}

export { getGateways, createGateway, deleteGateway, getAGateway };

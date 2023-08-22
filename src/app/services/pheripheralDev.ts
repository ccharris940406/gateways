import { PheripheralDev, PheripheralDevResponse } from "../types/gateways";
import { prisma } from "../utils/prismaClient";
import { gatewayDevsLength } from "../utils/validations";

async function createPheripheralDev(
  newPheripheralDevData: PheripheralDev
): Promise<PheripheralDevResponse> {
  if (newPheripheralDevData.gatewayId) {
    const devLength = await gatewayDevsLength(newPheripheralDevData.gatewayId);
    if (devLength > 9)
      return { error: { error: "The gateway is full of devs (limit = 10)" } };
  }

  try {
    const createPheripheralDev = await prisma.pheripheralDev.create({
      data: {
        uid: newPheripheralDevData.uid,
        vendor: newPheripheralDevData.vendor,
        createDate: newPheripheralDevData.createDate,
        status: newPheripheralDevData.status,
        ...(newPheripheralDevData.gatewayId !== undefined && {
          gateway: {
            connect: { id: newPheripheralDevData.gatewayId },
          },
        }),
      },
    });

    return {
      pheripheralDevData: {
        ...createPheripheralDev,
        createDate: createPheripheralDev.createDate.toString(),
      },
    };
  } catch (e) {
    return { error: { error: "Can not create a pheripheral dev" } };
  }
}

async function deleteDev(id: number) {
  try {
    const deletePheripheralDev = await prisma.pheripheralDev.delete({
      where: { uid: id },
    });
    return deletePheripheralDev.uid;
  } catch (e) {
    return "-1";
  }
}

export { createPheripheralDev, deleteDev };

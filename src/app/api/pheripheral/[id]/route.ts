import { PheripheralDev } from "@/app/types/gateways";
import { prisma } from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

type Params = {
  id: number;
};

type pheripheralUpdate = Partial<PheripheralDev>;

export async function PUT(req: Request, { params }: { params: Params }) {
  const update: pheripheralUpdate = await req.json();
  const id: number = +params.id;
  const updateDev = await prisma.pheripheralDev.update({
    where: {
      id: id,
    },
    data: {
      gateway:
        update.gatewayId !== null
          ? { connect: { id: update.gatewayId } }
          : { disconnect: { id: 0 } },
    },
  });
  return NextResponse.json(updateDev);
}

export async function GET(req: Request, { params }: { params: Params }) {
  const id: number = +params.id;
  const pheripheralDev = await prisma.pheripheralDev.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(pheripheralDev);
}

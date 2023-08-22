import { prisma } from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";

type id = {
  id: number;
};

export async function GET(req: Request, { params }: { params: id }) {
  const id: number = +params.id;
  const gateway = await prisma.gateways.findUnique({
    where: {
      id: id,
    },
    include: {
      PheripheralDev: true,
    },
  });
  return NextResponse.json(gateway);
}

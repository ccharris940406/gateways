import { createPheripheralDev } from "@/app/services/pheripheralDev";
import { PheripheralDev } from "@/app/types/gateways";
import { prisma } from "@/app/utils/prismaClient";
import { gatewayDevsLength } from "@/app/utils/validations";
import { NextResponse } from "next/server";

export async function GET() {
  const getPheripheralDev = await prisma.pheripheralDev.findMany();
  return NextResponse.json(getPheripheralDev);
}

export async function POST(req: Request) {
  const data: PheripheralDev = await req.json();
  const { pheripheralDevData: newDev, error } = await createPheripheralDev(
    data
  );

  if (!error) return NextResponse.json(newDev, { status: 200 });
  return NextResponse.json(error, {status: 403})
  // if (data.gatewayId) {
  //   const devLength = await gatewayDevsLength(data.gatewayId);
  //   if (devLength > 10)
  //     return NextResponse.json(
  //       {
  //         error: "The gateway is full of devs (limit = 10)",
  //       },
  //       { status: 500 }
  //     );
  // }
  // const createPheripheralDev = await prisma.pheripheralDev.create({
  //   data: {
  //     uid: data.uid,
  //     vendor: data.vendor,
  //     createDate: data.createDate,
  //     status: data.status,
  //     ...(data.gatewayId !== undefined && {
  //       gateway: {
  //         connect: { id: data.gatewayId },
  //       },
  //     }),
  //   },
  // });

  return NextResponse.json(createPheripheralDev.id, { status: 200 });
}

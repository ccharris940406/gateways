import { createPheripheralDev } from "@/app/services/pheripheralDev";
import { PheripheralDev } from "@/app/types/gateways";
import { prisma } from "@/app/utils/prismaClient";
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
  return NextResponse.json(error, { status: 403 });
}

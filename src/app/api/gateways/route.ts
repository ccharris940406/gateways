import { createGateway, getGateways } from "@/app/services/gateways";
import { Gateway } from "@/app/types/gateways";
import { NextResponse } from "next/server";

export async function GET() {
  const gateways = await getGateways();
  return NextResponse.json(gateways);
}

export async function POST(req: Request) {
  const data: Gateway = await req.json();
  const { gatewayData: gateway, error } = await createGateway(data);
  if (!error) return NextResponse.json(gateway, { status: 200 });
  return NextResponse.json(error, { status: 400});
}

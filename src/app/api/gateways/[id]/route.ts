import { getAGateway } from "@/app/services/gateways";
import { NextResponse } from "next/server";

type id = {
  id: number;
};

export async function GET(req: Request, { params }: { params: id }) {
  const id: number = +params.id;
  const { gatewayData, error } = await getAGateway(id);
  if (error) {
    return NextResponse.json(error, { status: 404 });
  }
  return NextResponse.json(gatewayData, { status: 200 });
}

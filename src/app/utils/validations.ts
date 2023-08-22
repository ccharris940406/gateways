import { prisma } from "./prismaClient";

function validateIvp4(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/; // Regular expression for IPv4
  if (!ipv4Regex.test(ip)) {
    return false;
  }
  const numbers = ip.split(".");
  if (parseInt(numbers[0]) === 0) return false;
  for (const num of numbers) {
    const value = parseInt(num, 10);
    if (value < 0 || value > 255) {
      return false;
    }
  }
  return true;
}

async function gatewayDevsLength(id: number): Promise<number> {
  const gateway = await prisma.gateways.findUnique({
    where: {
      id: id,
    },
    include: {
      PheripheralDev: true,
    },
  });
  return gateway ? gateway.PheripheralDev.length : 0;
}

export { validateIvp4, gatewayDevsLength };

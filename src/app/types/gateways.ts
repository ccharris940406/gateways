type PheripheralDevStatus = "ONLINE" | "OFFLINE";

type Gateway = {
  id?: number;
  serial: string;
  name: string;
  ipv4: string;
};

type PheripheralDev = {
  id?: number;
  uid: number;
  vendor: string;
  createDate: string;
  status: PheripheralDevStatus;
  gatewayId?: number;
};

type Error = {
  error: string;
};

type GatewayResponse =
  | {
      gatewayData?: undefined;
      error: Error;
    }
  | {
      gatewayData: Gateway;
      error?: undefined;
    };

type PheripheralDevResponse =
  | {
      pheripheralDevData: PheripheralDev;
      error?: Error;
    }
  | {
      pheripheralDevData?: undefined;
      error: Error;
    };

export {
  type Gateway,
  type PheripheralDev,
  type GatewayResponse,
  type PheripheralDevResponse,
};

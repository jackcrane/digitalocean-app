import * as Billing from "./Billing";
import * as Droplets from "./Droplets";

interface Error {
  message: string;
  code: number;
  severity: "fatal" | "nonfatal" | "auth" | "server";
}

interface Meta {
  total: number;
}

type RequestType = "GET" | "POST" | "PUT" | "DELETE";

export { Error, Billing, Droplets, Meta, RequestType };

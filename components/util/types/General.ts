import * as Billing from "./Billing";

interface Error {
  message: string;
  code: number;
  severity: "fatal" | "nonfatal" | "auth" | "server";
}

interface Meta {
  total: number;
}

type RequestType = "GET" | "POST" | "PUT" | "DELETE";

export { Error, Billing, Meta, RequestType };

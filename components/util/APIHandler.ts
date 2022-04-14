import type { Error as Error, Billing as BillingType } from "./types/General";
import { Storage } from "./Utilities";

const GetDOKey = async (): Promise<string> => {
  let key = await Storage.get("do_key");
  return key;
};

const NotifyOfError = (error: Error): void => {
  console.log(error);
};

type RequestType = "GET" | "POST" | "PUT" | "DELETE";

const MakeRequest = async (
  path: string,
  method: RequestType = "GET"
): Promise<object | Error> => {
  const response = await fetch(path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await GetDOKey()}`,
    },
  });

  if (response.status === 200) {
    return response.json();
  } else if (response.status === 401) {
    NotifyOfError({
      message: "unauthorized",
      code: 401,
      severity: "auth",
    });
  } else if (response.status === 429) {
    NotifyOfError({
      message: "too many requests",
      code: 429,
      severity: "nonfatal",
    });
  } else {
    NotifyOfError({
      message: "error",
      code: response.status,
      severity: "fatal",
    });
  }
};

const Billing = {
  History: async (): Promise<BillingType.BillingHistory> => {
    try {
      let running = true;
      let i = 0;
      let res = { billing_history: [] };
      while (running) {
        i++;
        let response = (await MakeRequest(
          `https://api.digitalocean.com/v2/customers/my/billing_history?per_page=200&page=${i}`,
          "GET"
        )) as BillingType.BillingHistory;
        response.billing_history = response.billing_history?.map((i) => ({
          ...i,
          amount: parseFloat(i.amount),
          date: new Date(i.date),
        }));
        res.billing_history = res.billing_history.concat(
          response.billing_history
        );
        if (
          typeof response.billing_history === "undefined" ||
          response.billing_history.length === 0
        ) {
          running = false;
        }
      }
      return res as BillingType.BillingHistory;
    } catch (e) {
      console.log("err", e);
      throw e;
    }
  },
};

export type { BillingType, Error };
export { Billing };

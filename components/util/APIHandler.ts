import type {
  RequestType,
  Error as Error,
  Billing as BillingType,
} from "./types/General";
import { Storage } from "./Utilities";

/**
 * Returns the DigitalOcean API key from device local storage. Does not ensure key validity, but will trigger NotifyOfError() and return an empty if there is no key saved.
 * @returns {Promise<string>}
 */
const GetDOKey = async (): Promise<string> => {
  let key = await Storage.get("do_key");
  if (key === null) {
    NotifyOfError({
      message: "no key",
      code: 401,
      severity: "auth",
    });
    return "";
  }
  return key;
};

/**
 * Void returning function to notify user and Sentry of errors.
 * @param {Error} error message
 * @returns {void}
 */
const NotifyOfError = (error: Error): void => {
  // TODO: notify user of error
  // TODO: send error to Sentry
  console.log(error);
};

/**
 *
 * @param {string} path API endpoint inluding domain and query parameters.
 * @param {RequestType=} method HTTP method for the request. Can be GET, POST, PUT, or DELETE. Defaults to GET.
 * @returns {Promise<object | Error>} Returns a promise that resolves to the response body if the request was successful, or an error object if the request failed. If an error occurs, NotifyOfError will be triggered.
 */
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

/**
 * Returns a promise that resolves to the API result for the specified path and method.
 * This function automatically takes care of pagination and will return all results, consolidated
 * by the `parentObject` parameter.
 */
const HandleRequestIterable = async (
  path: string,
  method: RequestType = "GET",
  parentObject: string
): Promise<object | Error> => {
  try {
    let running = true;
    let i = 0;
    let res = { [parentObject]: [] };
    while (running) {
      i++;
      let response = await MakeRequest(
        `${path}?per_page=200&page=${i}`,
        method
      );
      res[parentObject] = res[parentObject].concat(response[parentObject]);
      if (
        typeof response[parentObject] === "undefined" ||
        response[parentObject].length === 0
      ) {
        running = false;
      }
    }
    return res;
  } catch (e) {
    console.log("err", e);
    throw e;
  }
};

const Billing = {
  /**
   * Returns a list of billing history items.
   * @returns {Promise<BillingType.BillingHistory>}
   * @see https://api-engineering.nyc3.digitaloceanspaces.com/spec-ci/redoc-index.html#operation/list_billing_history
   */
  History: async (): Promise<BillingType.BillingHistory> => {
    let r = (await HandleRequestIterable(
      "https://api.digitalocean.com/v2/customers/my/billing_history",
      "GET",
      "billing_history"
    )) as BillingType.BillingHistory;

    r.billing_history = r.billing_history?.map(
      (i) =>
        i?.amount && {
          ...i,
          amount: parseFloat(i.amount?.toString()),
          date: new Date(i.date),
        }
    );
    r.billing_history = r.billing_history.filter((e) => {
      return e !== undefined;
    });

    return r;
  },

  /**
   * Returns the user's balance information
   * @returns {Promise<BillingType.Balance>}
   * @see https://api-engineering.nyc3.digitaloceanspaces.com/spec-ci/redoc-index.html#operation/get_customer_balance
   */
  Balance: async (): Promise<BillingType.Balance> => {
    let r = (await MakeRequest(
      "https://api.digitalocean.com/v2/customers/my/balance",
      "GET"
    )) as BillingType.Balance;

    r.account_balance = parseFloat(r.account_balance.toString());
    r.month_to_date_balance = parseFloat(r.month_to_date_balance.toString());
    r.month_to_date_usage = parseFloat(r.month_to_date_usage.toString());
    r.generated_at = new Date(r.generated_at);

    return r;
  },

  /**
   * Returns the user's invoice information
   * @param {string} invoice_id
   * @returns {Promise<BillingType.Invoice>}
   * @see https://api-engineering.nyc3.digitaloceanspaces.com/spec-ci/redoc-index.html#operation/get_invoice_by_uuid
   */
  Invoice: async (invoice_id): Promise<BillingType.Invoice> => {
    const r: BillingType.Invoice = await MakeRequest(
      `https://api.digitalocean.com/v2/customers/my/invoices/${invoice_id}/summary`,
      "GET"
    );

    r.amount = parseFloat(r.amount.toString());
    r.billing_period = new Date(r.billing_period);
    r.invoice_generated_at = new Date(r.billing_period);
    r.issue_date = new Date(r.issue_date);
    r.credits_and_adjustments.amount = parseFloat(
      r.credits_and_adjustments.amount.toString()
    );
    r.overages.amount = parseFloat(r.overages.amount.toString());
    r.product_charges.amount = parseInt(r.product_charges.amount.toString());

    r.product_charges.items = r.product_charges.items.map((i) => {
      return {
        ...i,
        amount: parseInt(i.amount.toString()),
      };
    });
    r.taxes.amount = parseFloat(r.taxes.amount.toString());
    return r;
  },
};

export type { BillingType, Error };
export { Billing };

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Touchable,
  ScrollView,
  Modal,
} from "react-native";
import Body from "./util/Body";
import styles from "./styles/BillingStyle";
import { colors } from "./styles/Uts";
import { Line, Spacer, Storage, ThinLine } from "./util/Utilities";
import { Billing as BillingHandler } from "./util/APIHandler";
import { BillingType } from "./util/APIHandler";

const Billing = (props) => {
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const [balance, setBalance] = useState<BillingType.Balance>({});
  useEffect(() => {
    (async () => {
      const _balance: BillingType.Balance = await BillingHandler.Balance();
      // @ts-ignore
      setBalance(_balance);
      setLoading(false);
    })();
  }, []);

  const [billingHistory, setBillingHistory] = useState([]);
  useEffect(() => {
    (async () => {
      const { billing_history } = await BillingHandler.History();
      setBillingHistory(billing_history);
    })();
  }, []);

  const [invoice, setInvoice] = useState<BillingType.Invoice>();

  const handleInvoiceTapped = (invoice) => {
    (async () => {
      setDetailsModalVisible(true);
      const invoiceItem = await BillingHandler.Invoice(invoice);
      console.log(invoiceItem);
      setInvoice(invoiceItem);
    })();
  };

  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        visible={detailsModalVisible}
        onRequestClose={() => {
          setDetailsModalVisible(false);
        }}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setDetailsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setDetailsModalVisible(false);
            }}
          >
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
          {invoice ? (
            <ScrollView>
              <Text style={styles.title}>
                Invoice information for{" "}
                {new Date(invoice.invoice_generated_at).toLocaleDateString()}
              </Text>
              <Spacer />
              <Line />
              <>
                <Text style={styles.subtitle}>Billed to</Text>
                <Spacer />
                <Text style={styles.text}>{invoice.user_name}</Text>
                <Text style={styles.text}>{invoice.user_email}</Text>
                <Spacer />
                <Text style={styles.text}>
                  {invoice.user_billing_address.address_line1}
                  {invoice.user_billing_address.address_line1 && "\n"}
                  {invoice.user_billing_address.address_line2}
                  {invoice.user_billing_address.address_line2 && "\n"}
                  {invoice.user_billing_address.city}
                  {invoice.user_billing_address.city && ", "}
                  {invoice.user_billing_address.region}
                  {invoice.user_billing_address.region && ", "}
                  {invoice.user_billing_address.postal_code}
                  {invoice.user_billing_address.postal_code && "\n"}
                  {invoice.user_billing_address.country_iso2_code}
                </Text>
              </>
              <Line />
              <>
                <Text style={styles.subtitle}>Invoice details</Text>
                <Spacer />
                <Text style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>Invoice ID: </Text>
                  {invoice.invoice_uuid}
                </Text>
                <Text style={styles.text}>
                  <>
                    <Text style={{ fontWeight: "bold" }}>Billing Period: </Text>
                    {invoice.billing_period}
                  </>
                </Text>
                <Text style={styles.text}>
                  <>
                    <Text style={{ fontWeight: "bold" }}>Issue Date: </Text>
                    {invoice.issue_date}
                  </>
                </Text>
                <Text style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>Invoice Amount: </Text>$
                  {invoice.amount}
                </Text>
              </>
              <Line />
              <>
                <Text style={styles.subtitle}>Breakdown</Text>
                <Spacer />
                <Text style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>
                    Product Usage Charges{" "}
                  </Text>
                  ${invoice.product_charges.amount}
                </Text>
                <ThinLine />
                {invoice.product_charges.items.map((e, i) => (
                  <View key={i}>
                    <Text style={{ ...styles.text, fontWeight: "bold" }}>
                      {e.name}
                    </Text>
                    <Text style={styles.text}>
                      Qty: {e.count} | Price: ${e.amount}
                    </Text>
                    <ThinLine />
                  </View>
                ))}
              </>
              <Line />
              <>
                <Text style={styles.subtitle}>Overages</Text>
                <Spacer />
                <Text style={styles.text}>${invoice.overages.amount}</Text>
              </>
              <Line />
              <>
                <Text style={styles.subtitle}>Taxes</Text>
                <Spacer />
                <Text style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>Amount </Text>$
                  {invoice.taxes.amount}
                </Text>
              </>
              <Line />
              <>
                <Text style={styles.subtitle}>Credits & Adjustments</Text>
                <Spacer />
                <Text style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>Amount </Text>$
                  {invoice.credits_and_adjustments.amount}
                </Text>
              </>
              <Line />
              <>
                <Text style={styles.subtitle}>Total</Text>
                <Spacer />
                <Text style={styles.text}>${invoice.amount}</Text>
              </>
              <Spacer height={100} />
            </ScrollView>
          ) : (
            <View>
              <ActivityIndicator size="large" color={colors.doblue} />
            </View>
          )}
        </View>
      </Modal>
      <Body title="Billing" nav={props.nav}>
        <Text style={styles.title}>Billing</Text>
        <Spacer />
        <Text style={styles.text}>
          Report generated on{" "}
          <Text style={{ fontStyle: "italic" }}>
            {!loading && balance.generated_at.toUTCString()}
          </Text>
        </Text>
        <Line />
        {!loading ? (
          <>
            <Text style={styles.subtitle}>Balance & Usage</Text>
            <ThinLine />
            <>
              <View style={styles.row}>
                <View style={styles.balance}>
                  <Text style={styles.balanceText}>
                    ${balance.month_to_date_usage}
                  </Text>
                </View>
                <Text style={styles.balanceExplanation}>
                  <Text style={{ fontWeight: "bold" }}>
                    Month to date usage
                  </Text>
                  {"\n"}
                  Amount used in the current billing period as of the
                  generated_at time.
                </Text>
              </View>
              <ThinLine />
              <View style={styles.row}>
                <View style={styles.balance}>
                  <Text style={styles.balanceText}>
                    ${balance.month_to_date_balance}
                  </Text>
                </View>
                <Text style={styles.balanceExplanation}>
                  <Text style={{ fontWeight: "bold" }}>
                    Month to date balance
                  </Text>
                  {"\n"}
                  Balance includes the account's balance and month to date usage
                </Text>
              </View>
              <ThinLine />
              <View style={styles.row}>
                <View style={styles.balance}>
                  <Text style={styles.balanceText}>
                    ${balance.account_balance}
                  </Text>
                </View>
                <Text style={styles.balanceExplanation}>
                  <Text style={{ fontWeight: "bold" }}>Account balance</Text>
                  {"\n"}
                  Current balance of the customer's most recent billing
                  activity. Does not reflect month to date usage.
                </Text>
              </View>
            </>
            <Line />
            <Text style={styles.subtitle}>History</Text>
            {billingHistory.length > 0 && (
              <View style={styles.history}>
                {billingHistory.map(
                  (e, i) =>
                    typeof e !== "undefined" && (
                      <View key={i} style={styles.historyRow}>
                        <ThinLine />
                        <TouchableOpacity
                          onPress={() =>
                            e.type === "Invoice" &&
                            handleInvoiceTapped(e.invoice_uuid)
                          }
                        >
                          <>
                            <Text
                              style={{ ...styles.text, fontWeight: "bold" }}
                            >
                              {e.description || "No description"}
                            </Text>
                            <Text style={styles.details}>
                              {new Date(e.date).toLocaleDateString()} | $
                              {e.amount}
                              {e.type === "Invoice" && (
                                <>
                                  {" "}
                                  |{" "}
                                  <Text style={{ color: colors.doblue }}>
                                    Tap for details
                                  </Text>
                                </>
                              )}
                            </Text>
                          </>
                        </TouchableOpacity>
                      </View>
                    )
                )}
              </View>
            )}
          </>
        ) : (
          <ActivityIndicator />
        )}
      </Body>
    </>
  );
};

export default Billing;

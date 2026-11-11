declare module "midtrans-client" {
  interface SnapOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey?: string;
  }

  interface TransactionParameter {
    transaction_details: {
      order_id: string;
      gross_amount: number;
    };
    item_details?: Array<{
      id: string;
      price: number;
      quantity: number;
      name: string;
    }>;
    customer_details?: {
      first_name?: string;
      email?: string;
    };
  }

  class Snap {
    constructor(options: SnapOptions);
    createTransaction(parameter: TransactionParameter): Promise<{ token: string; redirect_url: string }>;
  }

  const Midtrans: { Snap: typeof Snap };
  export default Midtrans;
}

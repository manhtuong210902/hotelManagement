const fetch = require("node-fetch");
// import * as fetch from 'node-fetch';
// const { CLIENT_ID, APP_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

const   generateAccessToken = async () => {
  // const auth = Buffer.from("AWO48qyUitVQoS7Y_3Uiw4tnqzm5rpyDBcoO-AVJFDjXbIFZuWXZ-hZgPNpD9XuwU_KaTNXg-6rmrWnS" + ":" + "EGwmRbr6uelc8S_LCXsmPi7afTegKJjqQQxRl7N-Nt4bxhqtMMuEC0iM7M2EJB9UrQH9RCeRIPvnv5Z_").toString("base64");
  const auth = Buffer.from(process.env.CLIENT_ID + ":" + process.env.APP_SECRET).toString("base64");
  
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

const  handleResponse = async(response) => {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
class paypalApi {
    async createOrder(data) {
        const accessToken = await generateAccessToken();
        
        const url = `${base}/v2/checkout/orders`;
        const response = await fetch(url, {
                method: "post",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
            {
            amount: {
                currency_code: "USD",
                value: data.rentalRoom.cost,
            },
            },
        ],
        }),
    });

    return handleResponse(response);
  }

  async  capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return handleResponse(response);
  }


}

module.exports = new paypalApi();

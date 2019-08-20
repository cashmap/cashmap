const functions = require('firebase-functions');
const axios = require('axios');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Exchange Public Token
exports.exchange = functions.https.onRequest(async (request, response) => {
  try {
    const public_token = request.body.public_token;
    await axios({
      method: 'post',
      url: `https://sandbox.plaid.com/item/${public_token}/exchange`,
    });
  } catch (error) {
    console.log('Fuck U', error);
  }
});

//Get Transactions
exports.getTrans = functions.https.onRequest(async (request, response) => {
  try {
    const result = await axios({
      method: 'post',
      url: 'https://sandbox.plaid.com/transactions/get',
      data: {
        client_id: functions.config().plaid.client_id,
        secret: functions.config().plaid.secret,
        access_token: request.body.public_token,
        start_date: '2017-01-01',
        end_date: '2018-01-01',
        options: {
          count: 250,
          offset: 100,
        },
      },
    });
    response.send(result);
  } catch (error) {
    console.log('Fuck u', error);
  }
});

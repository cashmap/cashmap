const functions = require('firebase-functions');
const axios = require('axios');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Exchange Public Token
exports.exchange = functions.https.onRequest(async (request, response) => {
  try {
    const public_token = request.body;
    console.log('server says: ', public_token);
    await axios({
      method: 'post',
      url: `https://sandbox.plaid.com/item/public_token/exchange`,
      data: {
        client_id: functions.config().plaid.client_id,
        secret: functions.config().plaid.secret,
        public_token: public_token,
      },
    });
  } catch (error) {
    console.log('Exchange Function Failure: ', error);
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
    console.log('Get Trans Function Failure: ', error);
  }
});

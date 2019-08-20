const functions = require('firebase-functions');
const axios = require('axios');
const firebase = require('firebase');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Exchange Public Token
exports.exchange = functions.https.onRequest(async (request, response) => {
  try {
    const { public_token } = request.body.data;
    console.log('public token: ', public_token);
    console.log('secret: ', functions.config().plaid.secret);
    console.log('client_id: ', functions.config().plaid.client_id);
    const data = await axios.post(
      `https://sandbox.plaid.com/item/public_token/exchange`,
      {
        client_id: functions.config().plaid.client_id,
        secret: functions.config().plaid.secret,
        public_token: public_token,
      }
    );
    console.log('data', data.data);
    // console.log('response', response);
    // await firebase.functions().httpsCallable('getTrans')({
    //   public_token: data.metadata.public_token,
    // });
  } catch (error) {
    console.log('Exchange Function Failure: ', error);
  }
});

//Get Transactions
exports.getTrans = functions.https.onRequest(async (request, response) => {
  try {
    const { access_token } = request.body.data;
    console.log('getTrans was called!');
    const result = await axios({
      method: 'post',
      url: 'https://sandbox.plaid.com/transactions/get',
      data: {
        client_id: functions.config().plaid.client_id,
        secret: functions.config().plaid.secret,
        access_token: access_token,
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

exports.hello = functions.https.onRequest(async (request, response) => {
  try {
    console.log('hello world!');
    response.send('hello world response!');
  } catch (error) {
    console.log('Hello Function Failure: ', error);
  }
});

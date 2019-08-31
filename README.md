# CashMap

CashMap is a personal-finance mobile application that displays your debit card and credit card transaction data by gathering data from the Plaid API.

## About
The front-end Plaid module contains a comprehensive list of banks that have partnerships with Plaid. Using React Native & Firebase with Cloud Functions, we were able to design a way to authenticate and make API requests from Plaid for all credit card transactions from a defined range of dates. The crux of our application is to plot transactions on Google Maps to display your spending activity based on location. To supplement this information, we included features in the form of a pie & bar chart to give users a visualization of their spending habits.

[Members](#Members)

## Members
- Christopher Choi
  - [Github](https://github.com/cchoi9)
  - [LinkedIn](https://www.linkedin.com/in/chrishchoi/)
- David Rusyniak
  - [Github](https://github.com/dmrusyniak)
  - [LinkedIn](https://www.linkedin.com/in/david-rusyniak-9685a0105/)
- Joshua Weiner
  - [Github](https://github.com/jweiner98)
  - [LinkedIn](https://www.linkedin.com/in/josh-weiner/)

## Technologies Used
- [React Native](https://facebook.github.io/react-native/)
- [Firebase](https://firebase.google.com/)
- [Firestore & Cloud Functions](https://firebase.google.com/docs/firestore)
- [FusionCharts](https://www.fusioncharts.com/)

## Setup

### Requirements
In order to run CashMap on your mobile device,
[Expo Client](https://apps.apple.com/us/app/expo-client/id982107779) must be downloaded.

Register with [Plaid's API](https://plaid.com/) to get a public key client secret and client ID.

In order to fully install all packages & dependencies:
- `npm install` in your run time environment 
- `cd functions/` folder and `npm install` 

### Logging In

You will be initiated into logging in with your email using Google OAuth. 

To sign up as a new user in sandbox mode when you've reached the Plaid authentication screen, choose a bank and use the following credentials:

    User: user_good
    Password: pass_good



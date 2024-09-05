import React from 'react';
import { WebView } from 'react-native-webview';

const PaystackWebView = () => {
  const paystackUrl = `https://paystack.com/pay/${yourGeneratedTransactionUrl}`;

  return (
    <WebView
      source={{ uri: paystackUrl }}
      onNavigationStateChange={state => {
        if (state.url.includes('success')) {
          // Handle successful payment
        } else if (state.url.includes('failed')) {
          // Handle payment failure
        }
      }}
    />
  );
};

export default PaystackWebView;

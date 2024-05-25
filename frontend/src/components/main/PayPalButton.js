import React from 'react';

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <div
      data-paypal
      data-amount={amount}
      data-currency="USD"
      data-client-id="dst5s4pnr2vnv6p4"
      data-on-success={onSuccess}
      data-on-error={onError}
    ></div>
  );
};

export default PayPalButton;

import React from 'react';

export default function Payment({ payment }) {
  return (
    <div>
      <span style={{ fontWeight: 'bold' }}>{payment.data().date}</span>{' '}
      <span style={{ fontWeight: 'bold', color: 'blue' }}>
        ${payment.data().amount}
      </span>{' '}
      from <span style={{ fontStyle: 'italic' }}>{payment.data().paidBy}</span>{' '}
      for <span style={{ fontStyle: 'italic' }}>{payment.data().for} </span>
      {/* {payment.data().recordedBy} */}
    </div>
  );
}

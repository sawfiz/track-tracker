// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

//Context
import { UserContext } from '../contexts/UserContext';

// Components
import AddPaymentModal from '../modals/AddPaymentModal';

// Styling
import Button from 'react-bootstrap/esm/Button';

export default function AthletePayments({ athleteID }) {
  const { userInfo } = useContext(UserContext);
  const allowEditing = ['admin', 'coach'].includes(userInfo.role);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const paymentsCollection = collection(db, 'users', athleteID, 'payments');
  const [payments, setPayments] = useState([]);

  const fetchData = async () => {
    const docRefs = await getDocs(paymentsCollection);
    const sortedDocs = docRefs.docs.sort((a, b) =>
      b.data().date > a.data().date ? 1 : -1
    );
    setPayments(sortedDocs);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [showPaymentModal]);

  const handleClick = () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <>
      <div className="outline-dashed outline-2 outline-pink-300 p-2 mb-2">
        {payments.map((payment) => (
          <Payment key={payment.id} payment={payment} />
        ))}
      </div>
      {allowEditing && (
        <>
          <div className="flex justify-end">
            <Button onClick={handleClick}>Add a Payment</Button>
          </div>
          <AddPaymentModal
            show={showPaymentModal}
            closePaymentModal={closePaymentModal}
            athleteID={athleteID}
          />
        </>
      )}
    </>
  );
}

function Payment({ payment }) {
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

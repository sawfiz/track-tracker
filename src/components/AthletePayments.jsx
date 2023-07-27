// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

//Context
import { UserContext } from '../contexts/UserContext';

// Components
import AddPaymentModal from '../modals/AddPaymentModal';
import withModalForm from './withModalForm';

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

  // Component to trigger the modal form
  const TriggerModalButton = ({ openModal, label }) => {
    return <button onClick={openModal}>{label}</button>;
  };

  // Configuration for the input elements
  const inputConfig = [
    {
      name: 'date',
      type: 'date',
      label: 'Date Input',
      required: true,
    },
    {
      name: 'payment',
      type: 'textarea',
      label: 'Textarea Input',
      required: true,
      rows: 5,
    },
  ];

  const CollectionVariable = 'myCollection'; // Replace 'myCollection' with your Firebase collection name
  const EnhancedModalForm = withModalForm(
    TriggerModalButton,
    inputConfig,
    CollectionVariable
  );

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
            <Button>
              <EnhancedModalForm
                label="Add a Note"
                title="New Payment"
                cancelLabel="Cancel"
                saveLabel="Save"
              />
            </Button>
          </div>
          {/* <div className="flex justify-end">
            <Button onClick={handleClick}>Add a Payment</Button>
          </div>
          <AddPaymentModal
            show={showPaymentModal}
            closePaymentModal={closePaymentModal}
            athleteID={athleteID}
          /> */}
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

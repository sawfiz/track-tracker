// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../../../config/firebase';

//Context
import { UserContext } from '../../../contexts/UserContext';
import { AthleteContext } from '../../../contexts/AthleteContext';

// Components
import withModalForm from '../../../components/withModalForm';

// Styling
import Button from 'react-bootstrap/esm/Button';

export default function AthletePayments({ athleteID }) {
  const { userInfo } = useContext(UserContext);
  const { getAthleteInfo } = useContext(AthleteContext);

  const allowEditing = ['admin', 'coach'].includes(userInfo.role);

  const [showModal, setShowModal] = useState(false);
  const myCollection = collection(db, 'users', athleteID, 'payments');
  const [payments, setPayments] = useState([]);
  const [info, setInfo] = useState({});

  const fetchPaymentData = async () => {
    const docRefs = await getDocs(myCollection);
    const sortedDocs = docRefs.docs.sort((a, b) =>
      b.data().date > a.data().date ? 1 : -1
    );
    setPayments(sortedDocs);
  };

  const fetchAthleteInfo = async () => {
    const data = await getAthleteInfo(athleteID);
    setInfo(data);
  };

  useEffect(() => {
    fetchPaymentData();
    fetchAthleteInfo();
  }, []);

  useEffect(() => {
    if (!showModal) fetchPaymentData();
  }, [showModal]);

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
      name: 'amount',
      type: 'number',
      label: 'Amount',
      required: true,
    },
    {
      name: 'paidBy',
      type: 'select',
      label: 'Paid by',
      required: true,
      options: ['', info.father, info.mother],
    },
    {
      name: 'for',
      type: 'textarea',
      label: 'Textarea Input',
      required: true,
      rows: 8,
    },
  ];

  const EnhancedModalForm = withModalForm(
    TriggerModalButton,
    inputConfig,
    myCollection
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
                showModal={showModal}
                setShowModal={setShowModal}
                label="Add a Payment"
                title="New Payment"
                cancelLabel="Cancel"
                saveLabel="Save"
              />
            </Button>
          </div>
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
    </div>
  );
}

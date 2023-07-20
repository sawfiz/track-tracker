// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

//Context
import { UserContext } from '../contexts/UserContext';

// Components
import Payment from './Payment';
import AddPaymentModal from '../modals/AddPaymentModal';

// Styling
import Button from 'react-bootstrap/esm/Button';
import styled from 'styled-components';

const S = {};

S.Container = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px dashed hotpink;
`;

S.ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 1rem;
`;

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
      <S.Container>
        {payments.map((payment) => (
          <Payment key={payment.id} payment={payment} />
        ))}
      </S.Container>
      {allowEditing && (
        <>
          <S.ButtonContainer>
            <Button onClick={handleClick}>Add a Payment</Button>
          </S.ButtonContainer>
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

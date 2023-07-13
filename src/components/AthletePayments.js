import React from 'react';
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


export default function AthletePayments() {
  return (
    <>
      <S.Container>Athlete Payments</S.Container>
      <S.ButtonContainer>
        <Button>Add a Payment</Button>
      </S.ButtonContainer>
    </>
  );
}

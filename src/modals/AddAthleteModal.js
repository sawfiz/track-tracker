import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
Modal.setAppElement('#root'); // Set the root element for the modal

const S = {};
S.Section = styled.div`
  margin: 1rem 0;
  border: 1px dashed hotpink;
  padding: 1rem;
`;
S.Entry = styled.div`
  margin: 0.3rem 0;
`;
S.Input = styled.input`
  position: absolute;
  left: 7rem;
`;
S.Select = styled.select`
  position: absolute;
  left: 7rem;
`;
S.Button = styled.button`
  margin: auto;
`;

export default function AddAthleteModal({ isOpen, closeModal }) {
  const handleModalClose = () => {
    closeModal();
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
      <h3>New Athlete</h3>
      <form>
        <S.Section>
          <S.Entry>
            <label>Name</label>
            <S.Input type="text" />
          </S.Entry>
          <S.Entry>
            <label>Gender</label>
            <S.Select>
              <option>-</option>
              <option>Male</option>
              <option>Female</option>
            </S.Select>
          </S.Entry>
          <S.Entry>
            <label>Birth date</label>
            <S.Input type="date" />
          </S.Entry>
          <S.Entry>
            <label>School</label>
            <S.Input type="text" />
          </S.Entry>
          <S.Entry>
            <label>Phone</label>
            <S.Input type="phone" />
          </S.Entry>
        </S.Section>

        <S.Section>
          <S.Entry>
            <label>Father</label>
            <S.Input type="text" />
          </S.Entry>
          <S.Entry>
            <label>Phone</label>
            <S.Input type="phone" />
          </S.Entry>
        </S.Section>

        <S.Section>
          <S.Entry>
            <label>Mother</label>
            <S.Input type="text" />
          </S.Entry>
          <S.Entry>
            <label>Phone</label>
            <S.Input type="phone" />
          </S.Entry>
        </S.Section>
        <S.Button>Add</S.Button>
      </form>
    </Modal>
  );
}

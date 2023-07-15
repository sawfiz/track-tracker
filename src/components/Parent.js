import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import EditParentModal from '../modals/EditParentModal';

const S = {
  Button: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px dashed hotpink;
    padding: 0.2rem 0.5rem;
    height: 1.8rem;
    background-color: #0000;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  `,
};

export default function Parent({user}) {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <>
      <S.Button onClick={handleClick}>{user.data().name}</S.Button>
      {show && <EditParentModal user={user} show={show} hideModal={hideModal}/>}
    </>
  )
}

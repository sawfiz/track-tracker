// Libraries
import React, { useState, useContext } from 'react';

// Modals
import EditParentModal from '../modals/EditParentModal';

export default function Parent({ user }) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <>
      <div
        className="outline-dashed outline-pink-500 h-8 flex items-center p-2"
        onClick={handleClick}
      >
        {user.data().name}
      </div>

      <EditParentModal user={user} show={show} hideModal={hideModal} />
    </>
  );
}

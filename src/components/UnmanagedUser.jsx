// Libraries
import React, { useState } from 'react';

// Modals
import UnmanagedUserModal from '../modals/UnmanagedUserModal';

export default function UnmanagedUser({ user }) {
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
        className="outline-dashed outline-2 outline-pink-300 h-8 flex items-center p-2"
        onClick={handleClick}
      >
        {user.data().name}
      </div>

      <UnmanagedUserModal user={user} show={show} hideModal={hideModal} />
    </>
  );
}

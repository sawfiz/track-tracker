import React from 'react';

// Styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Chevron({ expand }) {
  return (
    <span className='inline-block w-5'>
      {expand ? (
        <FontAwesomeIcon icon={faChevronDown} className="fa-thin" size="xs" />
      ) : (
        <FontAwesomeIcon icon={faChevronRight} className="fa-thin" size="xs" />
      )}
    </span>
  );
}

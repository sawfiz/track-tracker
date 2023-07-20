// Libraries
import React from 'react';

export default function Note({ note }) {
  return <div>{note.data().date} {note.data().note}</div>;
}

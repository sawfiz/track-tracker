import React from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, getDoc } from 'firebase/firestore';

export default function Note({ note }) {
  return <div>{note.data().date} {note.data().note}</div>;
}

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Config
import { db } from '../config/firebase';

import { UserContext } from '../contexts/UserContext';

import DelNewsModal from '../modals/DelNewsModal';

import Button from 'react-bootstrap/esm/Button';
import newsImg from '../images/default-news.png';
import EditNewsModal from '../modals/EditNewsModal';

const S = {
  Buttons: styled.div`
    display: flex;
    justify-content: space-around;
    margin: 1rem 0;
  `,
  CroppedImage: styled.img`
    object-fit: cover;
    object-position: center center;
    width: 100%;
  `,
};

export default function NewsDetails() {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const { id } = useParams();
  const newsCollection = collection(db, 'news');
  const navigate = useNavigate();

  const [news, setNews] = useState({});
  const [showDelModal, setShowDelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hasHeadline, setHasHeadline] = useState(true);

  const fetchData = async () => {
    const docRef = doc(newsCollection, id);
    const data = await getDoc(docRef);
    setNews(data.data());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openDelModal = () => {
    setShowDelModal(true);
  };

  const hideDelModal = () => {
    setShowDelModal(false);
  };

  const deleteNews = async () => {
    try {
      const docRef = doc(newsCollection, id);
      await deleteDoc(docRef);
      console.log('Document deleted successfully.');
      navigate('/edit-news');
      hideDelModal();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const hideEditModal = () => {
    setShowEditModal(false);
  };

  // Function to handle changes in the form
  const handleChange = (e) => {
    // if (e.target.name === 'headline' && e.target.value) {
    //   setHasHeadline(true);
    // }
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleChangePhoto = async (e) => {
    const file = e.target.files[0];
    // Upload the photo to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `athlete_photos/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    // Update the photoURL field in the form data
    setNews({ ...news, photoURL: downloadURL });
  };

  const handleChangeCheckbox = (e) => {
    setNews({ ...news, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (news.headline) {
      setHasHeadline(true);
      const newsDoc = doc(newsCollection, id);
      await updateDoc(newsDoc, news);
      hideEditModal();
    } else {
      setHasHeadline(false);
    }
  };

  return (
    <main>
      {isLoggedIn &&
        (userInfo.role === 'admin' || userInfo.role === 'coach') && (
          <>
            <p>
              <Link to="/admin">Admin Tools</Link>
            </p>
            <S.Buttons>
              <Button variant="primary" onClick={openEditModal}>
                Edit this
              </Button>
              <Button variant="danger" onClick={openDelModal}>
                Delete this
              </Button>
            </S.Buttons>
          </>
        )}
      <h5>{news.headline}</h5>
      <div>{news.date}</div>{' '}
      <div>
        <>
          {news.photoURL ? (
            <S.CroppedImage src={news.photoURL} alt="news" />
          ) : (
            <S.CroppedImage src={newsImg} alt="news" />
          )}
        </>
        {news.text}
      </div>
      <DelNewsModal
        show={showDelModal}
        hideDelModal={hideDelModal}
        deleteNews={deleteNews}
      />
      <EditNewsModal
        show={showEditModal}
        news={news}
        hasHeadline={hasHeadline}
        hideEditModal={hideEditModal}
        handleChange={handleChange}
        handleChangeCheckbox={handleChangeCheckbox}
        handleChangePhoto={handleChangePhoto}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}

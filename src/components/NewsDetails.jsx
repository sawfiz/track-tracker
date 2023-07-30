// Libraries
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

// Config
import { db } from '../config/firebase';

// Contexts
import { UserContext } from '../contexts/UserContext';

// Modals
import DelNewsModal from '../modals/DelNewsModal';

// Styling
import Button from 'react-bootstrap/esm/Button';
import EditNewsModal from '../modals/EditNewsModal';

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
      navigate('/manage-news');
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
      setNews({ ...news, publishedBy: userInfo.name });
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
            <div className="flex justify-around my-3">
              <Button variant="primary" onClick={openEditModal}>
                Edit
              </Button>
              <Button variant="danger" onClick={openDelModal}>
                Delete
              </Button>
            </div>
          </>
        )}
      <h5 className="text-slate-700">{news.headline}</h5>
      <div className="text-slate-500">{news.date}</div>
      <div>
        {news.photoURL ? (
          <img
            className="w-full max-h-[200px] object-cover object-center my-1 rounded-lg"
            src={news.photoURL}
            alt="news"
          />
        ) : (
          <img
            className="w-full max-h-[200px] object-cover object-center my-1 rounded-lg"
            src="/images/default-news.png"
            alt="news"
          />
        )}
        <div
          className="text-slate-600"
          dangerouslySetInnerHTML={{ __html: news.text }}
        />
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
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

// Config
import { db } from '../../config/firebase';

// Contexts
import { UserContext } from '../../contexts/UserContext';

// Components
import withModalForm from '../withModalForm';

// Modals
import DelNewsModal from './DelNewsModal';
// import EditNewsModal from '../modals/EditNewsModal';

// Styling
import Button from 'react-bootstrap/esm/Button';

export default function NewsDetails() {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Firestore collection
  const myCollection = collection(db, 'news');
  // State to show/hide the edit modal
  const [showModal, setShowModal] = useState(false);
  // Data for editing
  const [initialData, setInitialData] = useState(null);
  const news = initialData ? initialData.data() : '';
  // State to show/hide the delete modal
  const [showDelModal, setShowDelModal] = useState(false);

  const fetchData = async () => {
    const docRef = doc(myCollection, id);
    const data = await getDoc(docRef);
    setInitialData(data); // For editing
  };

  // Fetch data on initial render and when the edit modal closes 
  // to update the news and initialData state
  useEffect(() => {
    if (!showModal) fetchData();
  }, [showModal]);

  // Component to trigger the modal form
  const TriggerModalButton = ({ openModal, label }) => {
    return <button onClick={openModal}>{label}</button>;
  };

  // Configuration for the input elements
  const inputConfig = [
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
    },
    {
      name: 'headline',
      label: 'Textarea Input',
      type: 'textarea',
      required: true,
      rows: 3,
      placeholder: 'News headline...',
    },
    {
      name: 'text',
      label: 'Textarea Input',
      type: 'textarea',
      required: true,
      rows: 8,
      placeholder: 'News text...',
    },
    {
      name: 'photoURL',
      label: 'Photo',
      type: 'file',
    },
    {
      name: 'publish',
      label: 'Published',
      type: 'checkbox',
    },
  ];

  const EnhancedModalForm = withModalForm(
    TriggerModalButton,
    inputConfig,
    myCollection
  );

  const openDelModal = () => {
    setShowDelModal(true);
  };

  const hideDelModal = () => {
    setShowDelModal(false);
  };

  const deleteNews = async () => {
    try {
      const docRef = doc(myCollection, id);
      await deleteDoc(docRef);
      navigate('/manage-news');
      hideDelModal();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <main>
      {isLoggedIn &&
        (userInfo.role === 'admin' || userInfo.role === 'coach') && (
          <>
            <div className="flex justify-around my-3">
              <Button variant="primary">
                <EnhancedModalForm
                  showModal={showModal}
                  setShowModal={setShowModal}
                  label="Edit"
                  title="About Us"
                  cancelLabel="Cancel"
                  saveLabel="Save"
                  initialData={initialData}
                />
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
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

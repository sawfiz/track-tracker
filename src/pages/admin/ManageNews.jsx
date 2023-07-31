// Libraries
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../../config/firebase';

// Components
import NewsBrief from '../../components/news/NewsBrief';
import withModalForm from '../../components/withModalForm';

// Styling
import Button from 'react-bootstrap/esm/Button';
// import AddNewsModal from '../modals/AddNewsModal';

export default function ManageNews() {
  const myCollection = collection(db, 'news');

  const [showModal, setShowModal] = useState(false);
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    const docRefs = await getDocs(myCollection);
    const sortedNews = docRefs.docs.sort((a, b) => {
      const dateA = a.data().date;
      const dateB = b.data().date;
      return dateB.localeCompare(dateA);
    });
    setNews(sortedNews);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      placeholder: "News headline..."
    },
    {
      name: 'text',
      label: 'Textarea Input',
      type: 'textarea',
      required: true,
      rows: 8,
      placeholder: "News text..."
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
      lable: 'checkbox input',
    },
  ];

  const EnhancedModalForm = withModalForm(
    TriggerModalButton,
    inputConfig,
    myCollection
  );

  return (
    <main>
      <h2>Manage News</h2>
      {news.map((item) => (
        <NewsBrief key={item.id} news={item} headlineOnly={true} />
      ))}
      <div className="flex justify-center mt-4">
        <Button>
          <EnhancedModalForm
            showModal={showModal}
            setShowModal={setShowModal}
            label="Add"
            title="Add News"
            cancelLabel="Cancel"
            saveLabel="Save"
          />
        </Button>
      </div>
    </main>
  );
}

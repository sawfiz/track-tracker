// Libraries
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

// Components
import withModalForm from './withModalForm';

// Styling
import Button from 'react-bootstrap/esm/Button';
import { useEffect } from 'react';

export default function Admin() {
  const myCollection = collection(db, 'about');

  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const fetchData = async () => {
    const docRefs = await getDocs(myCollection);
    if (!docRefs.empty) {
      const document = docRefs.docs[0];
      setInitialData(document);
    }
  };

  // Fetch data on initial render and when modal close to update initialData state
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
      name: 'text',
      type: 'textarea',
      label: 'Textarea Input',
      placeholder: 'Write about us here...',
      required: true,
      rows: 15,
    },
  ];

  const EnhancedModalForm = withModalForm(
    TriggerModalButton,
    inputConfig,
    myCollection
  );

  return (
    <main>
      <h2>Admin Tools</h2>
      <h3 className="text-slate-600">Attendances</h3>
      <div className="outline-dashed outline-2 outline-pink-300 px-2 py-2 mb-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="primary">
            <Link to="/add-attendance" className="no-underline">
              <div className="grid grid-rows-[2fr_1fr]">
                <div className=" text-[2rem] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] ">
                  📝
                </div>
                <div className="text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
                  Add
                </div>
              </div>
            </Link>
          </Button>
          <Button>
            <Link to="/attendance" className="no-underline">
              <div className="grid grid-rows-[2fr_1fr]">
                <div className=" text-[2rem] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] ">
                  🗂️
                </div>
                <div className="text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
                  View
                </div>
              </div>
            </Link>
          </Button>
          {/* <Download table="attendance" /> */}
        </div>
      </div>

      <h3 className="text-slate-600">Users</h3>
      <div className="outline-dashed outline-2 outline-pink-300 px-2 py-2 mb-4">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="info">
            <Link to="/athletes" className="no-underline">
              <div className="grid grid-rows-[2fr_1fr]">
                <div className=" text-[2rem] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] ">
                  🏃🏻‍♂️🏃🏻‍♀️
                </div>
                <div className="text-black drop-shadow-[1px_1px_2px_rgba(255,255,255,0.9)]">
                  Athletes
                </div>
              </div>
            </Link>
          </Button>
          <Button variant="info">
            <Link to="/parents" className="no-underline">
              <div className="grid grid-rows-[2fr_1fr]">
                <div className=" text-[2rem] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] ">
                  👨🏻👩🏻
                </div>
                <div className="text-black drop-shadow-[1px_1px_2px_rgba(255,255,255,0.9)]">
                  Parents
                </div>
              </div>
            </Link>
          </Button>
          <Button variant="info">
            <Link to="/manage-users" className="no-underline">
              <div className="grid grid-rows-[2fr_1fr]">
                <div className=" text-[2rem] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] ">
                  🥷
                </div>
                <div className="text-black drop-shadow-[1px_1px_2px_rgba(255,255,255,0.9)]">
                  Strangers
                </div>
              </div>
            </Link>
          </Button>
        </div>
      </div>

      <h3 className="text-slate-600">Content</h3>
      <div className="outline-dashed outline-2 outline-pink-300 px-2 py-2">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="success">
            <Link to="/edit-news" className="no-underline">
              <div className="grid grid-rows-[2fr_1fr]">
                <div className=" text-[2rem] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] ">
                  📰
                </div>
                <div className="text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
                  News
                </div>
              </div>
            </Link>
          </Button>
          <Button variant="success">
            <EnhancedModalForm
              showModal={showModal}
              setShowModal={setShowModal}
              label={
                <div className="grid grid-rows-[2fr_1fr]">
                  <div className=" text-[2rem] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] ">
                    💪🏽💪🏽
                  </div>
                  <div className="text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
                    About Us
                  </div>
                </div>
              }
              title="About Us"
              cancelLabel="Cancel"
              saveLabel="Save"
              initialData={initialData}
            />
          </Button>
        </div>
      </div>
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

// Libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Styling
import Button from 'react-bootstrap/esm/Button';

export default function Admin() {
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
            <Link to="/manage-news" className="no-underline">
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
            <Link to="/about" className="no-underline">
              <div className="grid grid-rows-[2fr_1fr]">
                <div className=" text-[2rem] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)] ">
                  💪🏽💪🏽
                </div>
                <div className="text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
                  About Us
                </div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

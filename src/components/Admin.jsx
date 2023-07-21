// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Styling
import Button from 'react-bootstrap/esm/Button';
import styled from 'styled-components';

const S = {
  H3: styled.h3`
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #444;
  `,
  Grid2: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 1rem 0;
  `,
  Grid3: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 1rem 0;
  `,
  Content: styled.div`
    display: grid;
    grid-template-rows: 2fr 1fr;
  `,
  Icon: styled.div`
    font-size: 2rem;
    text-shadow: 1px 1px 2px black;
  `,
  TextLight: styled.div`
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
  `,
  TextDark: styled.div`
    color: black;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
  `,
};

export default function Admin() {
  return (
    <main>
      <h2>Admin Tools</h2>
      <S.H3>Attendances</S.H3>
      <div className="outline-dashed outline-pink-300 px-2 py-1 mb-4">
        <S.Grid2>
          <Button variant="primary">
            <Link to="/add-attendance" className="no-underline">
              <S.Content>
                <S.Icon>📝</S.Icon>
                <div className="text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
                  Add
                </div>
              </S.Content>
            </Link>
          </Button>
          <Button>
            <Link to="/attendance" className="no-underline">
              <S.Content>
                <S.Icon>🗂️</S.Icon>
                <div className="text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
                  View
                </div>
              </S.Content>
            </Link>
          </Button>
          {/* <Download table="attendance" /> */}
        </S.Grid2>
      </div>
      {/* <hr></hr> */}
      <S.H3>Users</S.H3>
      <div className="outline-dashed outline-pink-300 px-2 py-1 mb-4">
      <S.Grid3>
        <Button variant="info">
          <Link to="/athletes" className="no-underline">
            <S.Content>
              <S.Icon>🏃🏻‍♂️🏃🏻‍♀️</S.Icon>
              <div className="text-black drop-shadow-[1px_1px_2px_rgba(255,255,255,0.9)]">
                Athletes
              </div>
            </S.Content>
          </Link>
        </Button>
        <Button variant="info">
          <Link to="/parents" className="no-underline">
            <S.Content>
              <S.Icon>👨🏻👩🏻</S.Icon>
              <div className="text-black drop-shadow-[1px_1px_2px_rgba(255,255,255,0.9)]">
                Parents
              </div>
            </S.Content>
          </Link>
        </Button>
        <Button variant="info">
          <Link to="/manage-users" className="no-underline">
            <S.Content>
              <S.Icon>🥷</S.Icon>
              <div className="text-black drop-shadow-[1px_1px_2px_rgba(255,255,255,0.9)]">
                Strangers
              </div>
            </S.Content>
          </Link>
        </Button>
      </S.Grid3>
      </div>

      {/* <hr></hr> */}
      <S.H3>Content</S.H3>
      <div className="outline-dashed outline-pink-300 px-2 py-1">
      <S.Grid2>
        <Button variant="success">
          <Link to="/edit-news" className="no-underline">
            <S.Content>
              <S.Icon>📰</S.Icon>
              <div className="text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
                News
              </div>
            </S.Content>
          </Link>
        </Button>
        <Button variant="success">
          <Link to="/edit-about" className="no-underline">
            <S.Content>
              <S.Icon>💪🏽💪🏽</S.Icon>
              <div className="text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
                About Us
              </div>
            </S.Content>
          </Link>
        </Button>
      </S.Grid2>
      </div>
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

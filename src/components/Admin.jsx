import React from 'react';
import { Link } from 'react-router-dom';
import Download from './Download';
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
  Link: styled.a`
    text-decoration: none;
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
      <S.Grid2>
        <Button variant="primary">
          <Link to="/add-attendance" className='link-no-underline'> 
            <S.Content>
              <S.Icon>📝</S.Icon>
              <S.TextLight>Add</S.TextLight>
            </S.Content>
          </Link>
        </Button>
        <Button>
          <Link to="/attendance" className='link-no-underline'>
            <S.Content>
              <S.Icon>🗂️</S.Icon>
              <S.TextLight>View</S.TextLight>
            </S.Content>
          </Link>
        </Button>
        {/* <Download table="attendance" /> */}
      </S.Grid2>
      <hr></hr>
      <S.H3>Users</S.H3>
      <S.Grid3>
        <Button variant="info">
          <Link to="/athletes" className='link-no-underline'>
            <S.Content>
              <S.Icon>🏃🏻‍♂️🏃🏻‍♀️</S.Icon>
              <S.TextDark>Athletes</S.TextDark>
            </S.Content>
          </Link>
        </Button>
        <Button variant="info">
          <Link to="/parents" className='link-no-underline'>
            <S.Content>
              <S.Icon>👨🏻👩🏻</S.Icon>
              <S.TextDark>Parents</S.TextDark>
            </S.Content>
          </Link>
        </Button>
        <Button variant="info">
          <Link to="/manage-users"  className='link-no-underline'>
            <S.Content>
              <S.Icon>🥷</S.Icon>
              <S.TextDark>Strangers</S.TextDark>
            </S.Content>
          </Link>
        </Button>
        {/* <Download table="users" /> */}
      </S.Grid3>

      <hr></hr>
      <S.H3>Content</S.H3>
      <S.Grid2>
        <Button variant="success">
          <Link to="/edit-news" className='link-no-underline'>
            <S.Content>
              <S.Icon>📰</S.Icon>
              <S.TextLight>News</S.TextLight>
            </S.Content>
          </Link>
        </Button>
        <Button variant="success">
          <Link to="/edit-about" className='link-no-underline'>
            <S.Content>
              <S.Icon>💪🏽💪🏽</S.Icon>
              <S.TextLight>About Us</S.TextLight>
            </S.Content>
          </Link>
        </Button>
      </S.Grid2>
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

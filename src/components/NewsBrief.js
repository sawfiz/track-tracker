import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import newsImg from '../images/default-news.png';

const S = {
  NewsContainer: styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 120px auto;
  `,
  ImageContainer: styled.div`
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(255, 255, 0, 0.5);
  `,
  CroppedImage: styled.img`
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  `,
};

export default function NewsBrief({ news, headlineOnly }) {
  const { date, headline, text, photoURL, publish } = news.data();
  return (
    <div>
      {headlineOnly ? (
        <>
          {date} <Link to={`/news/${news.id}`}>{headline}</Link>{' '}
        </>
      ) : (
        <S.NewsContainer>
          <S.ImageContainer>
            {photoURL ? (
              <S.CroppedImage src={photoURL} alt="news" />
            ) : (
              <S.CroppedImage src={newsImg} alt="news" />
            )}
          </S.ImageContainer>
          <div>
            <div>{date}</div>
            <Link to={`/news/${news.id}`}>{headline}</Link>
          </div>
        </S.NewsContainer>
      )}
    </div>
  );
}

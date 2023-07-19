import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AthleteContext } from '../contexts/AthleteContext';

const S = {
  Button: styled.button`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px dashed hotpink;
    padding: 0.2rem 0.5rem;
    background-color: #0000;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  `,
  ImageContainer: styled.div`
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 5px;
  `,
  CroppedImage: styled.img`
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  `,
  ButtonLarge: styled.button`
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px dashed hotpink;
    padding: 0.2rem 0.5rem;
    background-color: #0000;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  `,
  ImageContainerLarge: styled.div`
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 15px;
  `,
  CroppedImageLarge: styled.img`
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  `,
};

export default function Athlete({ athleteID, small }) {
  const { getAthleteInfo } = useContext(AthleteContext);
  const [data, setData] = useState({});

  const fetchAthleteName = async () => {
    const info = await getAthleteInfo(athleteID);
    setData(info);
  };

  useEffect(() => {
    fetchAthleteName();
  }, []);

  return (
    <Link
      to={`/athletes/${athleteID}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      {small ? (
        <S.Button>
          {data.name}{' '}
          <S.ImageContainer>
            {data.photoURL ? (
              <S.CroppedImage src={data.photoURL} alt="profile" />
            ) : (
              <S.CroppedImage
              src={(data.gender==='Male') ? '/images/boy.png' : '/images/girl.png'}
                alt="profile"
              />
            )}
          </S.ImageContainer>
        </S.Button>
      ) : (
        <S.ButtonLarge>
          <S.ImageContainerLarge>
            {data.photoURL ? (
              <S.CroppedImage src={data.photoURL} alt="profile" />
            ) : (
              <S.CroppedImageLarge
                src={(data.gender==='Male') ? '/images/boy.png' : '/images/girl.png'}
                alt="profile"
              />
            )}
          </S.ImageContainerLarge>
          {data.name}
        </S.ButtonLarge>
      )}
    </Link>
  );
}

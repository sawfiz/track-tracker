import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';
import styled from 'styled-components';
import boyImg from '../images/boy.png';
import girlImg from '../images/girl.png';

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
};

export default function Athlete({ athleteID }) {
  const { getAthleteInfo } = useContext(AthleteDetailsContext);
  const [data, setData] = useState({});

  const fetchAthleteName = async () => {
    const name = await getAthleteInfo(athleteID);
    setData(name);
  };

  useEffect(() => {
    fetchAthleteName();
  }, []);

  return (
    <Link
      to={`/athletes/${athleteID}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <S.Button>
        {data.name}{' '}
        <S.ImageContainer>
          {data.photoURL ? (
            <S.CroppedImage
              src={data.photoURL}
              alt="boyImg"
            />
          ) : (
            <S.CroppedImage
              src={(data.gender==='Male') ? boyImg : girlImg}
              alt="boyImg"
            />
          )}
        </S.ImageContainer>
      </S.Button>
    </Link>
  );
}

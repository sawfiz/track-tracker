import React from 'react';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

export default function Footer() {
  const S = {};
  S.Footer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100vw;
    color: white;
    background-color: #333;
    font-size: 0.8rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  S.GitHub = styled.a`
    color: white;
  `;

  return (
    <S.Footer>
      <p>
        Copyright © 2023 VZ 
      </p>
    </S.Footer>
  );
}

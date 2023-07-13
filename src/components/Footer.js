import React from 'react';
import styled from 'styled-components';

const S = {};
  S.Footer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100vw;
    color: white;
    background-color: #333;
    font-size: 0.8rem;
    height: 1.3rem;
    display: flex;
    justify-content: center;
  `;

  S.GitHub = styled.a`
    color: white;
  `;


export default function Footer() {
  
  return (
    <S.Footer>
      <p>
        Copyright © 2023 VZ 
      </p>
    </S.Footer>
  );
}

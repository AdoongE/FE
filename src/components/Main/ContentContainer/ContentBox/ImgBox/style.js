import styled from 'styled-components';
import { font } from 'styles/font';

export const ImageBox = styled.div`
  width: 328px;
  height: 212px;
  background-color: var(--gray3);
  border-radius: 10px;
  position: relative;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 3.75px #9a9a9a;
`;

export const ContentImage = styled.img`
  ${({ isDefaultImage }) =>
    isDefaultImage
      ? `
    width: 78px; 
    height: 78px; 
    filter: invert(10%) sepia(54%) saturate(0%) hue-rotate(125deg) brightness(91%) contrast(90%);
  `
      : `
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px; 
  `}
`;

export const PDFThumbnail = styled.div`
  justify-content: center;
  align-items: center;
  overflow: hidden;

  canvas {
    width: 22.917vw !important; /* 440px */
    height: 14.792vw !important; /* 284px */
    object-fit: cover;
    border-radius: 0.521vw; /* 10px */
  }
`;

export const Dday = styled.div`
  position: absolute;
  width: fit-content;
  height: 17px;
  top: 12px;
  left: 16px;
  border-radius: 37.5px;
  padding: 4px 8px;
  opacity: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${font.body1}
  text-align: center;
  color: black;

  background-color: ${({ dDay }) =>
    dDay === 0
      ? '#9AE4D6'
      : dDay === -1 || dDay === -2 || dDay === -3
        ? '#DCDADA'
        : dDay <= -4
          ? '#FFFFFF'
          : 'transparent'};
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 12px;
  right: 6px;
`;

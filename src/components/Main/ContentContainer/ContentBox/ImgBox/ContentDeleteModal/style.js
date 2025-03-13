import styled from 'styled-components';

export const Buttons = styled.div`
  display: flex;
  column-gap: 1.042vw; /* 20px */
  position: absolute;
  top: 12.083vw; /* 232px */
  left: 9.323vw; /* 179px */
`;

export const No = styled.button`
  width: 6.771vw; /* 130px */
  height: 2.813vw; /* 54px */
  background-color: #f2f2f2;
  border-radius: 0.521vw; /* 10px */
  font-size: 1.146vw; /* 22px */
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4f4f4f;
  border: 0;
`;

export const Yes = styled.button`
  color: white;
  width: 6.771vw; /* 130px */
  height: 2.813vw; /* 54px */
  background-color: #41c3ab;
  border-radius: 0.521vw; /* 10px */
  font-size: 1.146vw; /* 22px */
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
`;

export const Alert = styled.div`
  position: absolute;
  font-weight: 600;
  font-size: 1.875vw; /* 36px */
  text-align: center;
  top: 6.354vw; /* 122px */
  left: 7.813vw; /* 150px */
`;

export const Dialog = styled.dialog`
  position: relative;
  width: 30vw;
  height: 15vw; /* 350px */
  border-radius: 2.604vw; /* 50px */
  background-color: white;
  border: 0;
  ::backdrop {
    background-color: #0000008c;
  }
`;

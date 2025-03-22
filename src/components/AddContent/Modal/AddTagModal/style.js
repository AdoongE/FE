import styled from 'styled-components';

export const Button = styled.button`
  width: 11.563vw; /* 222px */
  height: 3.021vw; /* 58px */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.521vw; /* 10px */
  border: 0;
  background-color: #41c3ab;
  font-weight: 600;
  font-size: 1.146vw; /* 22px */
  margin-left: 13.646vw; /* 262px */
`;

export const Line = styled.div`
  width: 36.406vw; /* 699px */
  height: 0;
  border: 0.052vw solid #9f9f9f; /* 1px */
  margin-top: 50px; /* 48px */
  margin-bottom: 32px; /* 38px */
`;

export const Dialog = styled.dialog`
  overflow-y: hidden;
  padding: 46px 48px 48px 40px; /* 55px */
  position: relative;
  width: 632px; /* 746px */
  height: 656px; /* 691px */
  border-radius: 40px; /* 50px */
  background-color: white;
  border: 0;
  ::backdrop {
    background-color: #0000008c;
  }
`;

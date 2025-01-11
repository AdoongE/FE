import React, { useEffect } from 'react';
import { StyledEngineProvider } from '@mui/styled-engine';
import Router from './routes/Router';
import GlobalStyle from './styles/GlobalStyle';

const convertPxToVw = () => {
  const elements = document.querySelectorAll('*'); // 모든 요소 선택
  elements.forEach((element) => {
    const style = window.getComputedStyle(element);
    const properties = [
      'width',
      'height',
      'font-size',
      'margin',
      'padding',
      'border-width',
    ]; // px를 변환할 주요 속성들

    properties.forEach((property) => {
      const value = style[property];
      if (value && value.includes('px')) {
        const newValue = (parseInt(value) / window.innerWidth) * 100; // px를 vw로 변환
        element.style[property] = `${newValue}vw`;

        // 변환 확인을 위한 로그
        console.log(`${property} - ${value} -> ${newValue}vw`);
      }
    });
  });
};

function App() {
  useEffect(() => {
    // 페이지가 로드된 후 실행
    convertPxToVw(); // 앱 로드 후 변환 함수 실행
  }, []); // 컴포넌트가 처음 마운트될 때만 실행되도록 빈 배열을 사용

  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyle />
      <Router />
    </StyledEngineProvider>
  );
}

export default App;

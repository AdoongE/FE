import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  ${reset}
  
  * {
    font-family: 'Pretendard-Regular', sans-serif;
  }

  /* 모든 요소에 대해 px를 vw로 변환하는 함수 적용 */
  * {
    transition: all 0.3s ease;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root{
    --green1: #21A58C;
    --green2: #41C3AB;
    --green3: #9AE4D6;
    --green3: #9AE4D6;
    --green4: #DEF3F1;
    --gray1: #4F4F4F;
    --gray2: #9F9F9F;
    --gray3: #DCDADA;
    --gray4: #F2F2F2;
    --gray6: #F6F6F6;
    --sidebar: #F8FBFB;
  }
  html, body, #root {
    font-family: "Pretendard";
  }
  * {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;

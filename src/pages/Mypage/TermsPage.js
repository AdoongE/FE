import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import styled from 'styled-components';
import InfoHeader from '../../components/bar/InfoHeader';
import { getTermDetail } from '../../components/api/InfoApi';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

function TermsPage() {
  const navbarMenuRef = useRef(null);
  const [activeTab, setActiveTab] = useState('이용약관');
  const [activeBarWidth, setActiveBarWidth] = useState(0);
  const [activeBarLeft, setActiveBarLeft] = useState(0);
  const [serviceDetail, setServiceDetail] = useState('');
  const [privacyDetail, setPrivacyDetail] = useState('');

  marked.setOptions({
    breaks: true,
  });

  const handleTabClick = (tabName, event) => {
    setActiveTab(tabName);
    const button = event.currentTarget;
    const { offsetWidth, offsetLeft } = button;

    setActiveBarWidth((offsetWidth / window.innerWidth) * 100);
    setActiveBarLeft((offsetLeft / window.innerWidth) * 100);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const serviceResponse = await getTermDetail({ type: 'SERVICE' });
        const privacyResponse = await getTermDetail({ type: 'PRIVACY' });

        setServiceDetail(serviceResponse?.content || '');
        setPrivacyDetail(privacyResponse?.content || '');
      } catch (err) {
        console.error('약관 로딩 실패:', err);
      }
    };
    fetchInfo();
  }, []);

  const renderMarkdown = (md) => {
    const html = marked(md || '');
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <div>
      <Navbar style={{ position: 'relative' }} />
      <Page>
        <Container>
          <InfoHeader title="이용약관" subTitle="SEEDZIP의 이용약관입니다." />
          <Line />
          <TabContainer>
            <NavbarMenu ref={navbarMenuRef}>
              <MenuButton
                onClick={(e) => handleTabClick('이용약관', e)}
                active={activeTab === '이용약관'}
              >
                서비스 이용약관
              </MenuButton>

              <MenuButton
                onClick={(e) => handleTabClick('처리방침', e)}
                active={activeTab === '처리방침'}
              >
                개인정보 처리방침
              </MenuButton>

              <ActiveBar width={activeBarWidth} left={activeBarLeft} />
            </NavbarMenu>

            <TabLine />

            <Box
              dangerouslySetInnerHTML={
                activeTab === '이용약관'
                  ? renderMarkdown(serviceDetail)
                  : renderMarkdown(privacyDetail)
              }
            />
          </TabContainer>
        </Container>
      </Page>
    </div>
  );
}

const Line = styled.div`
  width: 251px;
  height: 1px;
  background: var(--gray2, #9f9f9f);
`;

const Box = styled.div`
  // position: absolute;
  margin-top: 50px;
  width: 978px;
  padding: 30px;
  border-radius: 5px;
  top: 100px;
  border: 1px solid #9f9f9f;
  font-size: 16px;
  line-height: 1.6;

  h1,
  h2,
  h3 {
    margin-top: 20px;
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 12px;
  }

  strong {
    font-weight: 700;
  }

  ul,
  ol {
    padding-left: 20px;
    margin-bottom: 12px;
  }
`;

const TabContainer = styled.div`
  position: relative;
  margin-top: 68px;
  margin-bottom: 91px;
`;

const TabLine = styled.div`
  top: 40px;
  position: absolute;
  width: 978px;
  height: 1px;
  background: var(--side-bar, #9f9f9f);
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10%;
  left: 25%;
`;

const Container = styled.div`
  width: 100%;
`;

export const NavbarMenu = styled.div`
  display: flex;
  position: sticky;
  top: 0;
`;

export const MenuButton = styled.button`
  font-size: 20px;
  margin-right: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#000' : '#666')};
`;

export const ActiveBar = styled.div`
  position: absolute;
  height: 6px;
  background-color: #41c3ab;
  top: 35px;
  width: 150px;
  left: ${({ left }) => left}vw;
  transition:
    width 0.3s ease,
    left 0.3s ease;
`;

export default TermsPage;

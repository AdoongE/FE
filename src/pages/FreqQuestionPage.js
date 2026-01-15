import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SplashBar from '../components/bar/SplashBar';
import InfoHeader from '../components/bar/InfoHeader';
import FAQbox from '../components/box/FAQbox';
import { getFaq } from '../components/api/InfoApi';

function QuestionPage() {
  const [faqList, setFaqList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const take = 5;
  const nPage = Math.ceil(total / take);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const { list, totalElementCount } = await getFaq({
          page: currentPage - 1,
          take,
        });
        setFaqList(list);
        setTotal(totalElementCount);
      } catch (err) {
        console.error('FAQ 로딩 실패:', err);
      }
    };
    fetchFaq();
  }, [currentPage]);

  return (
    <PageWrapper>
      <SplashBar />
      <ContentArea>
        <Page>
          <Container>
            <InfoHeader
              title="FAQ"
              subTitle="궁금해 하실 만한 질문을 모아봤습니다."
              center={false}
            />
            <Line />
            <QuestionBox>
              {faqList.map((faq) => {
                return <FAQbox key={faq.id} faq={faq} />;
              })}
            </QuestionBox>
          </Container>
        </Page>
      </ContentArea>
      <PaginationContainer>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          {'<'}
        </PageButton>

        {numbers.map((number) => (
          <PageButton
            key={number}
            active={currentPage === number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </PageButton>
        ))}

        <PageButton
          disabled={currentPage === nPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {'>'}
        </PageButton>
      </PaginationContainer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 110vh;
  justify-content: center;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 10;
  margin-bottom: 40px;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: ${({ active }) => (active ? '#000' : '#4F4F4F')};
  font-weight: ${({ active }) => (active ? 500 : 400)};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    color: ${({ active }) => (active ? '#000' : '#333')};
  }
`;

const QuestionBox = styled.div`
  margin-top: 36px;
  margin-bottom: 200px;
`;

const Line = styled.div`
  width: 312px;
  height: 1px;
  background: var(--gray2, #9f9f9f);
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  // max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default QuestionPage;

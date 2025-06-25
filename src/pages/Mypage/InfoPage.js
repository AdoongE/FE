import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import styled from 'styled-components';
import InfoHeader from '../../components/bar/InfoHeader';
import InfoBox from '../../components/box/InfoBox';
import { getNotice } from '../../components/api/InfoApi';

function InfoPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [infoList, setInfoList] = useState([]);
  const [total, setTotal] = useState(20);
  const take = 10;
  const nPage = Math.ceil(total / take);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { list, count } = await getNotice({ page: currentPage, take });
        setInfoList(list);
        setTotal(count);
      } catch (err) {
        console.error('Info 로딩 실패:', err);
      }
    };
    fetchInfo();
  }, [currentPage]);

  useEffect(() => {
    console.log('info목록:', infoList);
    console.log('info 개수:', total);
  }, [infoList, total]);

  return (
    <div>
      <Navbar style={{ position: 'relative' }} />
      <Page>
        <Container>
          <InfoHeader
            title="공지사항"
            subTitle="SEEDZIP의 공지사항입니다. 새로운 소식을 가장 빠르게 알아보세요!"
          />
          <Line />
        </Container>
        {infoList.map((info) => (
          <InfoBox key={info.id} info={info} />
        ))}
      </Page>
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
    </div>
  );
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 10;
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

const Line = styled.div`
  width: 497px;
  height: 1px;
  background: var(--gray2, #9f9f9f);
  margin-bottom: 40px;
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

export default InfoPage;

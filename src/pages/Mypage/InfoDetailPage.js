import React from 'react';
import styled from 'styled-components';
import InfoHeader from '../../components/bar/InfoHeader';
import Navbar from '../../components/Navbar';
// import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';

function InfoDetailPage() {
  const location = useLocation();
  const { title, createdAt, content } = location.state || {};
  //   const [beforeInfo, setBeforeInfo] = useState();
  //   const [afterInfo, setAfterInfo] = useState();
  //   const [beforeInfoTitle, setBeforeInfoTitle] = useState('');
  //   const [beforeInfoDate, setBeforeInfoDate] = useState('');
  //   const [beforeId, setBeforeId] = useState(id - 1);
  //   const [afterId, setAfterId] = useState(id + 1);
  //   const [afterInfoTitle, setAfterInfoTitle] = useState('');
  //   const [afterInfoDate, setAfterInfoDate] = useState('');

  //   useEffect(() => {
  //     const fetchAdjacentNotices = async () => {
  //       try {
  //         const before = await getDetailNotice({ id: 2 });
  //         setBeforeInfo(before);
  //         // setBeforeInfoTitle(before.title);
  //         // setBeforeInfoDate(before.createdAt);
  //         console.log('이전 제목: ', before.title);
  //         console.log('이전 날짜: ', before.createdAt);
  //       } catch (err) {
  //         console.error('이전 Info 로딩 실패:', err);
  //       }
  //     };

  //     fetchAdjacentNotices();
  //   }, [beforeId]);

  //   useEffect(() => {
  //     const fetchAfterNotices = async () => {
  //       try {
  //         const after = await getDetailNotice({ id: 2     });
  //         setAfterInfo(after);
  //         // setAfterInfoTitle(after.title);
  //         // setAfterInfoDate(after.createdAt);
  //         console.log('다음 제목: ', after.title);
  //         console.log('다음 날쩌: ', after.createdAt);
  //       } catch (err) {
  //         console.error('다음 Info 로딩 실패:', err);
  //       }
  //     };

  //     fetchAfterNotices();
  //   }, [afterId]);

  return (
    <div>
      <Navbar style={{ position: 'relative' }} />
      <Page>
        <Container>
          <div>
            <InfoHeader title={title} subTitle={createdAt} />
            <Line />
            <Detail>{content}</Detail>
          </div>
          <InfoContainer>
            {/* <div> */}
            {/* <InfoLine />
              <InfoBox>
                <TitleBox>
                  <Icon
                    onClick={() => setBeforeId((prev) => prev - 1)}
                    icon="simple-line-icons:arrow-up"
                    width="22px"
                    style={{ color: '#414141' }}
                  />
                  <button
                    onClick={() =>
                      navigate(`/info-detail/${beforeId}`, {
                        state: {
                          id: beforeInfo.id,
                          title: beforeInfo.title,
                          createdAt: beforeInfo.createdAt,
                          detail: beforeInfo.content,
                        },
                      })
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      font: 'inherit',
                      cursor: 'pointer',
                    }}
                  >
                    {beforeInfo.title}
                  </button>
                </TitleBox>
                <div>{beforeInfo.createdAt}</div>
              </InfoBox>
            </div> */}
            {/* <div>
              <InfoLine />
              <InfoBox>
                <TitleBox>
                  <Icon
                    onClick={() => setAfterId((prev) => prev + 1)}
                    icon="simple-line-icons:arrow-down"
                    width="22px"
                    style={{ color: '#414141' }}
                  />
                  <button
                    onClick={() =>
                      navigate(`/info-detail/${afterId}`, {
                        state: {
                          id: afterInfo.id,
                          title: afterInfo.title,
                          createdAt: afterInfo.createdAt,
                          detail: afterInfo.content,
                        },
                      })
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      font: 'inherit',
                      cursor: 'pointer',
                    }}
                  >
                    {afterInfo.title}
                  </button>
                </TitleBox>
                <div>{afterInfo.createdAt}</div>
              </InfoBox>
            </div> */}
          </InfoContainer>
        </Container>
      </Page>
    </div>
  );
}

// const TitleBox = styled.div`
//   display: flex;
//   column-gap: 50px;
//   font-weight: 500;
//   line-height: 150%;
// `;

// const InfoLine = styled.div`
//   width: 978px;
//   height: 1px;
//   background-color: #ccc;
// `;

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

// const InfoBox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 22px 15px;
//   font-size: 20px;
//   align-items: center;
//   flex-direction: row;
//   font-weight: 400;
//   line-height: 150%;
// `;

const Detail = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  white-space: pre-line;
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
  justify-content: flex-start;
  /* align-items: center; */
  position: absolute;
  top: 10%;
  left: 25%;
  height: calc(100vh - 100px);
`;

const Container = styled.div`
  width: 100%;
  padding: 0 100px 148px 0;
`;

export default InfoDetailPage;

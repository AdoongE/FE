import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ContentHeader from '../components/ContentHeader';
import ContentBox from '../components/ContentBox';
import ContentBlank from '../components/ContentBlank';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ViewThumbnailModal from '../components/modal/ViewThumbnailModal';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.78.221.255',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const MainPage = () => {
  const [collectData, setCollectData] = useState([]); // 모아보기 전체 콘텐츠 수
  const [sortedData, setSortedData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('모아보기');
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCateName] = useState('');
  const [sortOrder, setSortOrder] = useState('최신순'); // 정렬 기준
  const [currentPage, setCurrentPage] = useState(1);
  const contentPerPage = 9;
  const [selectedData, setSelectedData] = useState(null);
  const [filterId, setFilterId] = useState(null);
  const [filterName, setFilterName] = useState('');

  const openModal = (data) => setSelectedData(data);
  const closeModal = () => setSelectedData(null);

  console.log('activeTab : ', activeTab);

  /******************************************************************************************/
  // fetchData : 메인페이지의 모든 콘텐츠들을 조회하는 api 요청 함수
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let url = '';
      if (activeTab === '모아보기' || activeTab === '나의 씨드') {
        url = '/api/v1/content/';
        const res = await api.get(url);
        setCollectData(res.data.results[0].contentsInfoList); // 오로지 카테고리 내 콘텐츠 갯수를 알기위해서
      } else if (activeTab === '카테고리') {
        url = `/api/v1/content/${categoryId}`;
      } else if (activeTab === '맞춤필터') {
        console.log('필터 ID :', filterId);
        url = `/api/v1/filter/${filterId}`;
      }

      if (!url) {
        console.warn('유효하지 않은 URL 요청입니다.');
        return;
      }

      console.log('GET 요청할 URL:', url);
      const response = await api.get(url);

      // 응답 데이터 확인
      console.log('응답 데이터:', response.data.results);

      const results =
        response.data.results.flatMap((item) => {
          if (activeTab === '맞춤필터') {
            return {
              id: item.contentId || 'ID 없음',
              title:
                item.contentName ||
                (item.updatedDt
                  ? new Date(item.updatedDt).toISOString().split('T')[0]
                  : '날짜 정보 없음'),
              categoryId: item.categoryId || [],
              category: item.categoryName?.[0] || '카테고리 없음',
              contentDateType: item.contentDateType || '타입 없음',
              thumbnailImage: item.thumbnailImage || '',
              updatedDt: item.updatedDt || '업데이트 정보 없음',
              tagId: item.tagId || [],
              tags: item.tagName || [],
              dDay: item.dday,
            };
          } else {
            return item.contentsInfoList?.map((content) => {
              const formattedDate = content.updatedDt
                ? new Date(content.updatedDt).toISOString().split('T')[0]
                : '날짜 정보 없음';

              return {
                id: content.contentId || 'ID 없음',
                title: content.contentName || formattedDate,
                category: content.categoryName || [],
                tags: content.tagName || [],
                dDay: content.dday,
                contentDateType: content.contentDateType || '타입 없음',
                thumbnailImage: content.thumbnailImage || '',
                updatedDt: content.updatedDt || '업데이트 정보 없음',
                createdAt: content.createdAt || new Date(),
              };
            });
          }
        }) ?? [];

      setOriginalData(results);
      setSortedData(results); // 초기 데이터 설정
    } catch (error) {
      console.error(
        '데이터 가져오기 실패:',
        error.response ? error.response.data : error,
      );
    } finally {
      setLoading(false);
    }
  }, [activeTab, categoryId, filterId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // 문제 사례 : ContentDeleteModal.js에서 콘텐츠를 삭제했을 때, 새로고침을 하지 않으면 콘텐츠 삭제된 것이 반영되지 않음
  /******************************************************************************************/

  // 정렬 처리
  useEffect(() => {
    const sorted = [...originalData].sort((a, b) => {
      if (sortOrder === '최신순') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOrder === '이름순') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    setSortedData(sorted);
  }, [sortOrder, originalData]);

  // 페이지네이션 처리
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(sortedData.length / contentPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  const displayedContentBoxes = sortedData.slice(
    (currentPage - 1) * contentPerPage,
    currentPage * contentPerPage,
  );

  const getPaginationNumbers = () => {
    const totalPages = Math.ceil(sortedData.length / contentPerPage);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const categoryCounts =
    collectData &&
    collectData.reduce((counts, item) => {
      if (Array.isArray(item.categoryName) && item.categoryName[0]) {
        counts[item.categoryName[0]] = (counts[item.categoryName[0]] || 0) + 1;
      }
      return counts;
    }, {});

  return (
    <MainContainer>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarContainer>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCategoryId={setCategoryId}
          setCateName={setCateName}
          categoryCounts={categoryCounts}
          filterId={filterId}
          setFilterId={setFilterId}
          setFilterName={setFilterName}
        />
      </SidebarContainer>
      <MainContent>
        <ContentHeader
          setSortOrder={setSortOrder}
          categoryId={categoryId}
          categoryName={categoryName}
          filterId={filterId}
          filterName={filterName}
        />
        <ContentArea $isBlank={sortedData.length === 0}>
          {loading ? (
            <div>로딩 중...</div> // 로딩 상태 표시
          ) : sortedData.length === 0 ? (
            <ContentBlank /> // 데이터가 없을 때
          ) : (
            displayedContentBoxes.map((data) => {
              const formattedDate = new Date(data.createdAt).toLocaleDateString(
                'ko-KR',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              );

              return (
                <React.Fragment key={data.id}>
                  <ContentBox
                    key={data.id}
                    contentId={data.id}
                    title={data.title || formattedDate} // 제목이 없으면 생성 날짜 사용
                    category={data.category}
                    tags={data.tags}
                    dDay={data.dDay}
                    contentDateType={data.contentDateType}
                    thumbnailImage={data.thumbnailImage}
                    updatedDt={data.updatedDt}
                    open={() => openModal(data)}
                  />
                  {selectedData && selectedData.id === data.id && (
                    <ViewThumbnailModal
                      file={data.thumbnailImage}
                      onClose={closeModal}
                      contentDataType={selectedData.contentDateType}
                    />
                  )}
                </React.Fragment>
              );
            })
          )}
        </ContentArea>

        {/* 페이지네이션 */}
        <Pagination>
          <PageArrow
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </PageArrow>
          {getPaginationNumbers().map((page) => (
            <PageNumber
              key={page}
              $active={currentPage === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageNumber>
          ))}
          <PageArrow
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(sortedData.length / contentPerPage)
            }
          >
            {'>'}
          </PageArrow>
        </Pagination>
      </MainContent>
    </MainContainer>
  );
};

// 스타일 컴포넌트
const MainContainer = styled.div`
  display: flex;
  padding-left: 390px;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  width: 345px;
  height: 100vh;
  z-index: 1;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 45px;
  margin-top: 118px;
`;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0;

  & > div {
    aspect-ratio: 440 / 387;
    width: 100%;
    max-width: 600px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 110px;
  padding-bottom: 58px;
`;

const PageArrow = styled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  color: ${(props) => (props.disabled ? '#ccc' : '#000')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  &:hover {
    color: ${(props) => (props.disabled ? '#ccc' : '#333')};
  }
`;

const PageNumber = styled.button`
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#000' : '#999')};
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

export default MainPage;
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { axiosInstance } from '../components/api/axios-instance';
import SplashBar from '../components/bar/SplashBar';
import FieldSelectPlaceholder from '../components/dropdown/FieldDropdown';
import SingleSelectPlaceholder from '../components/dropdown/JobDropdown';
import { Icon } from '@iconify/react';

function MyPage() {
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isFieldOther, setIsFieldOther] = useState(false);
  const [customOccupation, setCustomOccupation] = useState('');
  const [customField, setCustomField] = useState('');
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [originalMyData, setOriginalMyData] = useState({});
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = useState(false);

  const getDetail = async () => {
    try {
      const response = await axiosInstance.get('api/v1/member');
      const result = response.data.results[0];
      console.log('수정 전 개인정보: ', result);
      setOriginalMyData(result);
      setChecked(result.consentToMarketingAndAds || false);
      // reset(result);
      if (response.status === 200) {
        console.log('개인정보 조회 성공');
      } else {
        console.error('개인정보 조회 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const schema = yup.object().shape({
    nickname: yup
      .string()
      .matches(/^[가-힣a-zA-Z0-9\s]{1,10}$/, '*공백포함 10자 이내')
      .required('*필수 항목입니다.'),
    birthday: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, '*필수 항목입니다.')
      .required('*필수 항목입니다.'),
    gender: yup.string().required('*필수 항목입니다.'),
    occupation: yup.string(),
    field: yup.string(),
    consentToMarketingAndAds: yup.boolean(),
  });

  const {
    reset,
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    // trigger,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      originalMyData,
      consentToMarketingAndAds: false,
    },
  });

  useEffect(() => {
    if (originalMyData) {
      reset({
        ...originalMyData,
        consentToMarketingAndAds: checked,
      });
    }
  }, [originalMyData, checked, reset]);

  useEffect(() => {
    setValue('consentToMarketingAndAds', checked);
  }, [checked, setValue, isClicked]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      consentToMarketingAndAds: checked,
    };
    console.log('폼 데이터 제출:', formData);

    try {
      const result = await axiosInstance.patch(`/api/v1/member`, formData);
      if (result?.data?.status?.code === 200) {
        console.log('회원정보 수정 성공');
        navigate('/mypage');
      }
    } catch (error) {
      console.error(`회원정보 수정 실패: `, error);
    }
  };

  const logOut = async () => {
    try {
      const response = await axiosInstance.delete(`/api/v1/member`);
      if (response?.data?.status?.code === 200) {
        setOpen(false);
        console.log('회원정보 삭제 성공: ' + response.data.status.message);
        navigate('/');
      }
    } catch (error) {
      alert(
        `회원 탈퇴 실패: ${error.message || '알 수 없는 오류가 발생했습니다.'}`,
      );
    }
  };

  const formValues = watch();
  useEffect(() => {
    console.log('현재 폼 값:', formValues);
  }, [formValues]);

  const showModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <SplashBar />
          <Page>
            <Header>
              <Titles>마이페이지</Titles>
              <Short>개인 정보 수정</Short>

              <Line />
            </Header>
            <Signup>
              <Option>
                <Name>닉네임 *</Name>
                <Inputs
                  type={'text'}
                  {...register('nickname')}
                  placeholder="닉네임을 입력하세요."
                  onClick={handleClick}
                />
                {errors.nickname && touchedFields.nickname && (
                  <Error>{errors.nickname?.message}</Error>
                )}
              </Option>
              <Option>
                <Name>생년원일 *</Name>
                <Date
                  onClick={handleClick}
                  type="date"
                  {...register('birthday')}
                />
                {errors.birthday && touchedFields.birthday && (
                  <Error>{errors.birthday?.message}</Error>
                )}
              </Option>
              <Option>
                <Name>성별 *</Name>

                <Controller
                  onClick={handleClick}
                  name="gender"
                  control={control}
                  defaultValue={''}
                  render={({ field, fieldState }) => (
                    <Gender>
                      <GenderChoice
                        label="MALE"
                        value={field.value}
                        $isSelected={field.value === 'MALE'}
                        onClick={() => field.onChange('MALE')}
                        $error={fieldState.error ? true : undefined}
                        $helperText={
                          fieldState.error && fieldState.error.message
                        }
                      >
                        남자
                      </GenderChoice>
                      <GenderChoice
                        label="FEMALE"
                        value={field.value}
                        $isSelected={field.value === 'FEMALE'}
                        onClick={() => field.onChange('FEMALE')}
                        $error={fieldState.error ? true : undefined}
                        $helperText={
                          fieldState.error && fieldState.error.message
                        }
                      >
                        여자
                      </GenderChoice>
                    </Gender>
                  )}
                />
                {errors.gender && touchedFields.gender && (
                  <Error>{errors.gender?.message}</Error>
                )}
              </Option>
              <Option>
                <Name>직업</Name>
                <Choice>
                  <Controller
                    name="occupation"
                    control={control}
                    defaultValue={''}
                    render={({ field, fieldState }) => (
                      <SingleSelectPlaceholder
                        label="occupation"
                        $error={fieldState.error ? true : undefined}
                        $helperText={
                          fieldState.error && fieldState.error.message
                        }
                        value={isOtherSelected ? '' : field.value}
                        onChange={(value) => {
                          if (value === '기타(직접 입력)') {
                            field.onChange('');
                            setIsOtherSelected(true);
                          } else {
                            field.onChange(value);
                            setIsOtherSelected(false);
                          }
                        }}
                      />
                    )}
                  />
                  {isOtherSelected && (
                    <Input
                      placeholder="직접 입력"
                      type="text"
                      value={customOccupation}
                      onChange={(e) => setCustomOccupation(e.target.value)}
                      onBlur={() => setValue('occupation', customOccupation)}
                    />
                  )}
                </Choice>
              </Option>
              <Option>
                <Name>분야</Name>
                <Choice>
                  <Controller
                    name="field"
                    control={control}
                    defaultValue={''}
                    render={({ field, fieldState }) => (
                      <FieldSelectPlaceholder
                        label="field"
                        $error={fieldState.error ? true : undefined}
                        $helperText={
                          fieldState.error && fieldState.error.message
                        }
                        value={isFieldOther ? '' : field.value}
                        onChange={(value) => {
                          if (value === '기타(직접 입력)') {
                            field.onChange('');
                            setIsFieldOther(true);
                          } else {
                            field.onChange(value);
                            setIsFieldOther(false);
                          }
                        }}
                      />
                    )}
                  />

                  {isFieldOther && (
                    <Input
                      placeholder="직접 입력"
                      type="text"
                      value={customField}
                      onChange={(e) => setCustomField(e.target.value)}
                      onBlur={() => setValue('field', customField)}
                    />
                  )}
                </Choice>
              </Option>
              <Option>
                <Name>선택 약관 동의 여부</Name>
                <Lines />
                <div>
                  <NewContent>
                    <Checkbox
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 30 },
                        '&.Mui-checked': {
                          color: '#41C3AB',
                        },
                      }}
                      checked={checked}
                      onChange={handleChange}
                    />
                    <Content>
                      {/* accordion mui 라이브러리 이용 */}
                      (선택) 마케팅 활용 및 광고성 정보 수신 동의 {'>'}
                    </Content>
                  </NewContent>
                </div>
              </Option>
            </Signup>
            <Button disabled={!isValid} type="submit">
              수정하기
            </Button>
          </Page>
        </div>
      </form>
      <Out onClick={() => showModal()}>탈퇴하기</Out>
      {open && (
        <Backdrop onClick={closeModal}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <Icon
              icon="ph:warning-circle-thin"
              width="148"
              height="148"
              style={{ color: '#41c3ab', marginBottom: 34 }}
            />
            <ModalTitle>정말 탈퇴하시겠습니까?</ModalTitle>
            <ModalContent>
              회원탈퇴 시 모든 정보가 삭제되며, 복구되지 않습니다.
            </ModalContent>
            <Buttons>
              <ModalButton1 onClick={closeModal}>취소</ModalButton1>
              <ModalButton2 onClick={logOut}>확인</ModalButton2>
            </Buttons>
          </Dialog>
        </Backdrop>
      )}
    </div>
  );
}

const ModalButton1 = styled.button`
  font-weight: 500;
  font-size: 22px;
  width: 146px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 0;
  color: #4f4f4f;
  background-color: #f2f2f2;
`;

const ModalButton2 = styled.button`
  font-weight: 500;
  font-size: 22px;
  width: 146px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 0;
  color: white;
  background-color: #41c3ab;
`;

const Buttons = styled.div`
  display: flex;
  column-gap: 20px;
`;

const ModalContent = styled.div`
  font-weight: 400;
  font-size: 26px;
  color: #4f4f4f;
  margin-bottom: 30px;
`;

const ModalTitle = styled.div`
  font-weight: 600;
  font-size: 40px;
  margin-bottom: 10px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Dialog = styled.div`
  position: relative;
  width: 900px;
  height: 519px;
  border-radius: 50px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const Out = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 103px;
  font-weight: 500;
  font-size: 24px;
  text-decoration: underline;
`;

const Lines = styled.div`
  width: 1094px;
  height: 0px;
  border: 1px solid #9f9f9f;
  margin-top: 4px;
  margin-bottom: 24px;
`;

const Error = styled.div`
  color: red;
  font-size: 18px;
  transform: translateY(-7px);
`;

const Date = styled.input`
  font-size: 18px;
  width: 238px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #9f9f9f;
`;

const Button = styled.button`
  width: 704px;
  height: 76px;
  font-weight: 600;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 160px;
  background-color: #41c3ab;
  border: 0;
  border-radius: 10px;
  color: white;
  margin-bottom: 20px;

  &:disabled {
    background-color: #dcdada;
    color: #9f9f9f;
  }
`;

const NewContent = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: center;
`;

const Content = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

const Input = styled.input`
  width: 224px;
  height: 65px;
  border-radius: 5px;
  border: 1px solid #9f9f9f;
  font-size: 25px;

  &::placeholder {
    font-weight: 400;
    font-size: 20px;
    line-height: 23.87px;
    color: #9f9f9f;
    transform: translateX(34px);
  }
`;

const Choice = styled.div`
  display: flex;
  column-gap: 37px;
`;

const GenderChoice = styled.div`
  width: 179px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 5px;
  border: 0;

  background-color: ${(props) => (props.$isSelected ? '#41C3AB' : '#DCDADA')};
`;

const Gender = styled.div`
  display: flex;
  column-gap: 20px;
`;

const Inputs = styled.input`
  width: 1094px;
  height: 65px;
  border-radius: 5px;
  border: 1px solid #9f9f9f;
  font-size: 25px;

  &::placeholder {
    font-weight: 400;
    font-size: 20px;
    color: #9f9f9f;
    transform: translateX(32px);
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Signup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 80px;
  margin-top: 60px;
`;

const Line = styled.div`
  width: 441px;
  height: 0px;
  border: 1px solid #9f9f9f;
`;

const Short = styled.div`
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  color: #9f9f9f;
  margin-top: 26px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 86px;
`;
const Titles = styled.div`
  font-weight: 600;
  font-size: 50px;
  text-align: center;
`;

export default MyPage;

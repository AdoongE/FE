import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddCategory from '../components/dropdown/AddCategoryDropdown';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NewAddCategoryModal from '../components/modal/NewAddCategoryModal';
import AddTagModal from '../components/modal/AddTagModal';
import LinkUploader from '../components/LinkUploader';
import PdfUploadComponent from '../components/PdfUpload';
import ImageUploadComponent from '../components/ImageUpload';
import { ContentEditHandler } from '../components/api/ContentEditApi';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Navbar from '../components/Navbar';

function ContentEditPage() {
  const navigate = useNavigate();
  const [representativeIndex, setRepresentativeIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [isComposing, setIsComposing] = useState(false); // 한국어 태그 이슈 해결을 위한
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { Id } = useParams();
  const [originalContentDetail, setOriginalContentDetail] = useState({
    // tags: [],
  });

  const location = useLocation();
  const { dataType } = location.state || {};

  console.log('dataType:', dataType);

  const handleTagInput = (event) => {
    if (isComposing) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = event.target.value;
      if (
        newTag &&
        !tags.includes(newTag) &&
        newTag.length <= 8 &&
        !/\s/.test(newTag)
      ) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setValue('tags', updatedTags, { shouldValidate: true });
        trigger('tags');
        event.target.value = '';
      }
    }
  };

  const ChangeRef = useRef(null);

  const handleImage = (index) => {
    setRepresentativeIndex(index); // 대표 이미지 상태 업데이트
    setValue('thumbnailImage', index, { shouldValidate: true });
    trigger('thumbnailImage');
    // if (onSetRepresentativeImage) {
    //   onSetRepresentativeImage(index); // 부모 컴포넌트로 콜백 전달
    // }
  };

  const handlePdf = (index) => {
    setRepresentativeIndex(index); // 대표 파일 인덱스 관리
    setValue('thumbnailImage', index, { shouldValidate: true }); // Form 값 설정
    trigger('thumbnailImage');
  };

  const dialogeRef = useRef(null);
  const TagRef = useRef(null);

  const showModal = () => {
    dialogeRef.current?.showModal();
  };

  const showTagModal = () => {
    TagRef.current?.showModal();
  };

  useEffect(() => {
    if (ChangeRef.current) {
      const dialogElement = ChangeRef.current;

      const handleClickOutside = (event) => {
        const dialogArea = dialogElement.getBoundingClientRect();
        if (
          event.clientX < dialogArea.left ||
          event.clientX > dialogArea.right ||
          event.clientY < dialogArea.top ||
          event.clientY > dialogArea.bottom
        ) {
          dialogElement.close();
        }
      };
      dialogElement.addEventListener('mousedown', handleClickOutside);
      return () => {
        dialogElement.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

  const token = localStorage.getItem('jwtToken');
  const api = axios.create({
    baseURL: 'http://210.107.205.122:20011',
    headers: { Authorization: `${token}` },
  });

  const getDetail = async () => {
    try {
      const response = await api.get(`/api/v1/content/all/${Id}`);
      const results = response.data.results[0];
      console.log('수정 전 data: ', results);
      setOriginalContentDetail(results);
      reset(results);
      if (response.status === 200) {
        console.log('콘텐츠 상세 조회 성공');
      } else {
        console.error('콘텐츠 상세 조회 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    getDetail();
  }, [Id]);

  useEffect(() => {
    if (originalContentDetail && originalContentDetail.tags) {
      setTags(originalContentDetail.tags);
    }
  }, [originalContentDetail]);

  const schema = yup.object().shape({
    contentDataType: yup
      .string()
      .required('콘텐츠 형식을 선택하세요.')
      .oneOf(['LINK', 'IMAGE', 'PDF'], '유효한 콘텐츠 형식을 선택하세요.'),
    contentName: yup.string(),
    boardCategory: yup
      .array()
      .of(yup.string())
      .max(5, '최대 5개의 항목만 선택 가능합니다')
      .min(1, '카테고리를 최소 1개 선택해주세요.')
      .required(),
    thumbnailImage: yup
      .number()
      .nullable()
      .test(
        'is-thumbnail-required',
        '대표 이미지/PDF를 선택해주세요.',
        function (value) {
          const { dataType } = this.parent;
          if (dataType === 'IMAGE' || dataType === 'PDF') {
            return value !== null && value !== undefined;
          }
          return true;
        },
      ),
    contentLink: yup
      .string()
      .nullable()
      .test('is-link-required', '링크를 입력해주세요.', function (value) {
        const { dataType } = this.parent;
        if (dataType === 'LINK') {
          return value && value.trim() !== '';
        }
        return true;
      }),
    tags: yup
      .array()
      .of(yup.string())
      .min(2, '2개 이상의 태그를 선택해주세요.')
      .required(),
    dday: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: '유효한 날짜 형식이어야 합니다.',
        excludeEmptyString: true,
      })
      .nullable()
      .notRequired(),
    contentDetail: yup.string().max(1500).nullable().notRequired(),
  });

  const {
    reset,
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      originalContentDetail,
    },
  });

  const errorRef = useRef(null);
  const showLinkModal = () => {
    errorRef.current?.showModal();
  };

  const handleCustomSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 유효성 검사 통과된 데이터만 처리됨
      let updateData = {
        contentDataType: dataType,
        contentName: data.contentName,
        boardCategory: data.boardCategory,
        tags: data.tags,
        dday: data.dday || null,
        contentDetail: data.contentDetail || null,
        contentLink: data.contentLink || null,
        thumbnailImage: representativeIndex || null,
      };

      // if (dataType === 'LINK') {
      //   updateData.contentLink = data.contentLink;
      // } else if (dataType === 'IMAGE') {
      //   updateData.thumbnailImage = representativeIndex; // 대표 이미지 포함
      // }

      console.log('콘텐츠 값:', updateData);

      // API 호출
      await ContentEditHandler(updateData, Id);

      if (TagRef.current) {
        TagRef.current.resetTags();
      }

      navigate('/main');
    } catch (error) {
      console.error('수정 실패:', error);
    } finally {
      setIsSubmitting(false); // 제출 상태 해제
    }
  };

  const onInvalid = (errors) => {
    // 유효성 검사 실패 시 에러 메시지 표시
    console.error('유효성 검사 실패:', errors);
    setErrorMessage('필수 항목을 모두 입력하세요.');
  };

  useEffect(() => {
    if (errorMessage) {
      showLinkModal();
      const timer = setTimeout(() => {
        errorRef.current?.close();
        setErrorMessage('');
      }, 1200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorMessage, setErrorMessage]);

  const contentDetail = watch('contentDetail', '');

  const formValues = watch();

  useEffect(() => {
    console.log('현재 폼 값:', formValues);
  }, [formValues]);

  useEffect(() => {
    console.log('현재 isValid 상태:', isValid);
  }, [isValid]);

  useEffect(() => {
    trigger('tags');
  }, [tags]);

  const noChange = () => {
    reset(originalContentDetail);
    navigate('/main');
  };

  return (
    <div>
      <Navbar />
      <form>
        <MainDiv>
          <LeftDiv>
            <TitleDiv
              placeholder="제목을 입력하세요 (선택)"
              type="text"
              name="contentName"
              {...register('contentName')}
            />
          </LeftDiv>
        </MainDiv>

        <ContentPage>
          <Contents>
            <Inputs>
              <Name>카테고리 지정*</Name>
              <Inputs>
                <Controller
                  name="boardCategory"
                  control={control}
                  defaultValue={[]}
                  render={({ field, fieldState }) => (
                    <>
                      <AddCategory
                        label="boardCategory"
                        $error={fieldState.error ? true : undefined}
                        $helperText={
                          fieldState.error && fieldState.error.message
                        }
                        value={field.value || []}
                        onChange={(newValue) => {
                          if (newValue.length <= 5) {
                            field.onChange(newValue);
                            trigger('boardCategory');
                          }
                        }}
                      />
                      <InputButton
                        type="button"
                        onClick={() => showModal(field)}
                      >
                        + 카테고리 추가
                      </InputButton>
                      <NewAddCategoryModal
                        ref={dialogeRef}
                        onConfirm={(newCategory) => {
                          if (field.value.length < 5) {
                            field.onChange([
                              ...field.value,
                              newCategory.trim(),
                            ]);
                          }
                        }}
                      />
                    </>
                  )}
                />
              </Inputs>
            </Inputs>

            {dataType === 'LINK' && (
              <Controller
                name="contentLink"
                control={control}
                render={({ field, fieldState }) => (
                  <LinkUploader
                    label="contentLink"
                    $error={fieldState.error ? true : undefined}
                    $helperText={fieldState.error && fieldState.error.message}
                    value={field.value || []}
                    onChange={(value) => {
                      field.onChange(value);
                      trigger('contentLink');
                    }}
                  />
                )}
              />
            )}
            {dataType === 'IMAGE' && (
              <ImageUploadComponent onSetRepresentative={handleImage} />
            )}
            {dataType === 'PDF' && (
              <PdfUploadComponent onSetRepresentative={handlePdf} />
            )}

            {originalContentDetail && originalContentDetail.tags && (
              <Tag>
                <TagName>태그 (2개 이상)*</TagName>
                <TagInputs>
                  <TagDiv>
                    <TagContainer>
                      <Controller
                        name="tags"
                        control={control}
                        defaultValue={[...originalContentDetail.tags]}
                        render={({ field }) => (
                          <>
                            {tags.map((tag, idx) => (
                              <Chip key={idx}>
                                <TagP>{tag}</TagP>
                                <Icon
                                  icon="ic:round-close"
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    color: 'white',
                                  }}
                                  onClick={() => {
                                    const updatedTags = tags.filter(
                                      (item) => item !== tag,
                                    );
                                    setTags(updatedTags);
                                    field.onChange(updatedTags);
                                    if (TagRef.current) {
                                      TagRef.current.removeTags(tag);
                                    }
                                  }}
                                />
                              </Chip>
                            ))}
                            <TagInput
                              onBlur={() => trigger('tags')}
                              onCompositionStart={() => setIsComposing(true)}
                              onCompositionEnd={() => setIsComposing(false)}
                              onKeyDown={handleTagInput}
                              placeholder={
                                tags.length == 0
                                  ? '엔터를 입력하여 태그를 등록해주세요'
                                  : ''
                              }
                            />
                            <AddTagModal
                              ref={TagRef}
                              originalTags={originalContentDetail.tags}
                              onConfirm={(newTags) => {
                                setTags(newTags);
                                setValue('tags', newTags);
                              }}
                            />
                          </>
                        )}
                      />
                    </TagContainer>
                    <InputButton type="button" onClick={() => showTagModal()}>
                      + 태그 선택
                    </InputButton>
                  </TagDiv>
                  <Recommends>
                    <Recommend>추천</Recommend>
                    <RecommendBox>
                      <Icon
                        icon="ri:reset-left-line"
                        style={{
                          width: '15px',
                          height: '15px',
                          marginRight: '10px',
                          color: '#4F4F4F',
                        }}
                      />
                      태크 추천받기
                    </RecommendBox>
                  </Recommends>
                </TagInputs>
              </Tag>
            )}
            <Dday>
              <Long>
                <Name>
                  디데이
                  <Short>
                    디데이를 입력하면 해당 날짜에 알림을 받을 수 있습니다.
                  </Short>
                </Name>
              </Long>
              <Date type="date" {...register('dday')} defaultValue={null} />
            </Dday>
            <Memo>
              <Name>메모 입력</Name>
              <div>
                <Text
                  defaultValue={null}
                  maxLength={1500}
                  name="contentDetail"
                  type="text"
                  {...register('contentDetail')}
                  placeholder="메모를 입력하세요."
                />
                <Count>
                  {contentDetail === null ? 0 : contentDetail.length}/1500
                </Count>
              </div>
            </Memo>
          </Contents>
          <ButtonContainers>
            <NoButtons
              type="button"
              onClick={() => {
                noChange();
              }}
            >
              취소하기
            </NoButtons>
            <Buttons
              type="button"
              onClick={() => {
                if (isValid) {
                  handleSubmit((data) => handleCustomSubmit(data))();
                } else {
                  onInvalid();
                }
              }}
            >
              수정 완료하기
            </Buttons>
            {errorMessage && showLinkModal()}
          </ButtonContainers>
          <ErrorDialog ref={errorRef}>
            <Alert
              severity="info"
              sx={{
                bgcolor: '#F2F2F2',
                mt: 2,
                width: '507.73px',
                height: '99.73px',
                display: 'flex',
                fontSize: '28px',
                size: '28px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                border: '0',
              }}
            >
              {errorMessage}
            </Alert>
          </ErrorDialog>
        </ContentPage>
      </form>
    </div>
  );
}

const ErrorDialog = styled.dialog`
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
`;

const NoButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 289px;
  height: 76px;
  border-radius: 10px;
  border: 0;
  background-color: #dcdada;
  color: #9f9f9f;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 80px;
`;

const Chip = styled.div`
  width: fit-content;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 0;
  border-radius: 5px;
  column-gap: 15px;
  background-color: #41c3ab;
  padding-left: 16px;
  padding-right: 16px;
  margin: 4px 4px;
`;

const TagP = styled.p`
  font-size: 20px;
`;

const ButtonContainers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
`;

const Count = styled.div`
  width: fit-content;
  font-weight: 400;
  font-size: 20px;
  color: #9f9f9f;
  transform: translateX(1268px) translateY(-40px);
`;

const RecommendBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 393px;
  height: 31px;
  border-radius: 5px;
  background-color: #eeeeee;
  border: 0;
  color: #4f4f4f;
  font-weight: 400;
  font-size: 15px;
`;

const Recommend = styled.div`
  font-weight: 400;
  font-size: 18px;
  color: #4f4f4f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Recommends = styled.div`
  display: flex;
  column-gap: 17px;
`;

const InputButton = styled.button`
  width: fit-content;
  height: 44.19px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #9f9f9f;
  color: white;
  font-weight: 500;
  font-size: 20px;
  background-color: #9f9f9f;
  padding: 10px 18px;
`;

const TagContainer = styled.div`
  width: 709px;
  min-height: 60px;
  border: 1px solid #9f9f9f;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px 6px;
`;

const TagInputs = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const TagInput = styled.input`
  flex-grow: 1;
  padding: 0.5em 0;
  border: none;
  outline: none;
  font-size: 20px;
  background-color: transparent;
`;

const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const Text = styled.textarea`
  width: 1334px;
  height: 238px;
  border-radius: 10px;
  border: 1px solid #9f9f9f;
  font-size: 20px;
  padding-left: 27px;
  padding-top: 26px;
  padding-right: 27px;

  &::placeholder {
    color: #4f4f4f;
    font-weight: 400;
    font-size: 20px;
  }
`;

const Dday = styled.div``;

const Tag = styled.div`
  display: flex;
  column-gap: 41px;
`;

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const Date = styled.input`
  width: 238px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #9f9f9f;
  font-size: 20px;
  font-weight: 400;
  color: #4f4f4f;
`;

const Short = styled.span`
  font-weight: 400;
  font-size: 20px;
  color: #8b8b8b;
  margin-left: 10px;
`;

const Long = styled.div`
  display: flex;
  column-gap: 10px;
  margin-bottom: 22px;
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 30px;
`;

const TagName = styled.div`
  font-weight: 400;
  font-size: 30px;
  margin-top: 12px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 80px;
  margin-top: 57px;
  margin-bottom: 80px;
`;

const Buttons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 289px;
  height: 76px;
  border-radius: 10px;
  border: 0;
  background-color: #41c3ab;
  color: white;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 80px;
`;

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 1334px;
`;

const MainDiv = styled.div`
  display: flex;
  padding-top: 20vh;
  position: relative;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 1334px;
`;

const TitleDiv = styled.input`
  font-size: 40px;
  color: #9f9f9f;
  border: none;
  border-bottom: 2px solid #9f9f9f;
  margin-bottom: 80px;
  padding-bottom: 10px;

  &::placeholder {
    font-size: 40px;
    color: #9f9f9f;
  }
`;

export default ContentEditPage;

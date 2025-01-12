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
import EditLinkUpload from '../components/EditLinkUpload';
import EditImageUpload from '../components/EditImageUpload';
import EditPdfUpload from '../components/EditPdfUpload';
import { ContentEditHandler } from '../components/api/ContentEditApi';
import { axiosInstance } from '../components/api/axios-instance';
import Alert from '@mui/material/Alert';
import Navbar from '../components/Navbar';

function ContentEditPage() {
  const navigate = useNavigate();
  const [representativeIndex, setRepresentativeIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [isComposing, setIsComposing] = useState(false); // 한국어 태그 이슈 해결을 위한
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const { Id } = useParams();
  const [originalContentDetail, setOriginalContentDetail] = useState({
    // tags: [],
  });

  const location = useLocation();
  const { dataType } = location.state || {};

  console.log('dataType, images :', dataType, images);

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

  const getDetail = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/content/all/${Id}`);
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

      if (dataType === 'LINK') {
        updateData.contentLink = data.contentLink;
      } else {
        updateData.thumbnailImage = representativeIndex; // 대표 이미지 포함
      }

      console.log('콘텐츠 값:', updateData);

      await ContentEditHandler(dataType, updateData, images, files, Id);

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
                  <EditLinkUpload
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
              <EditImageUpload
                onSetRepresentative={handleImage}
                setImages={setImages}
                Id={Id}
              />
            )}
            {dataType === 'PDF' && (
              <EditPdfUpload
                onSetRepresentative={handlePdf}
                setFiles={setFiles}
                Id={Id}
              />
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
                                    width: '1.25vw',
                                    height: '1.25vw',
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
                          width: '0.781vw',
                          height: '0.781vw',
                          marginRight: '0.521vw',
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
                width: '26.467vw' /* 507.73px */,
                height: '5.194vw' /* 99.73px */,
                display: 'flex',
                fontSize: '1.458vw' /* 28px */,
                size: '1.458vw' /* 28px */,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '0.417vw' /* 8px */,
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
  top: -0.729vw; /* -14px */
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
`;

const NoButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15.052vw; /* 289px */
  height: 3.958vw; /* 76px */
  border-radius: 0.521vw; /* 10px */
  border: 0;
  background-color: #dcdada;
  color: #9f9f9f;
  font-size: 1.563vw; /* 30px */
  font-weight: 600;
  margin-bottom: 4.167vw; /* 80px */
`;

const Chip = styled.div`
  width: fit-content;
  height: 2.292vw; /* 44px */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 0;
  border-radius: 0.26vw; /* 5px */
  column-gap: 0.781vw; /* 0.781vw */
  background-color: #41c3ab;
  padding-left: 0.833vw; /* 16px */
  padding-right: 0.833vw; /* 16px */
  margin: 0.208vw 0.208vw; /* 4px */
`;

const TagP = styled.p`
  font-size: 1.042vw; /* 20px */
`;

const ButtonContainers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2.083vw; /* 40px */
`;

const Count = styled.div`
  width: fit-content;
  font-weight: 400;
  font-size: 1.042vw; /* 20px */
  color: #9f9f9f;
  transform: translateX(66.042vw) translateY(-2.083vw); /* 1268px, -40px */
`;

const RecommendBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20.469vw; /* 393px */
  height: 1.615vw; /* 31px */
  border-radius: 0.26vw; /* 5px */
  background-color: #eeeeee;
  border: 0;
  color: #4f4f4f;
  font-weight: 400;
  font-size: 0.781vw; /* 0.781vw */
`;

const Recommend = styled.div`
  font-weight: 400;
  font-size: 0.938vw; /* 18px */
  color: #4f4f4f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Recommends = styled.div`
  display: flex;
  column-gap: 0.885vw; /* 17px */
`;

const InputButton = styled.button`
  width: fit-content;
  height: 2.292vw; /* 44.19px */
  border-radius: 0.521vw; /* 10px */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.052vw solid #9f9f9f; /* 1px */
  color: white;
  font-weight: 500;
  font-size: 1.042vw; /* 20px */
  background-color: #9f9f9f;
  padding: 0.521vw 0.938vw; /* 10px 18px */
`;

const TagContainer = styled.div`
  width: 36.927vw; /* 709px */
  min-height: 3.125vw; /* 60px */
  border: 0.052vw solid #9f9f9f; /* 1px */
  border-radius: 0.521vw; /* 10px */
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 0.313vw; /* 6px */
`;

const TagInputs = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.781vw; /* 0.781vw */
`;

const TagInput = styled.input`
  flex-grow: 1;
  padding: 0.26em 0;
  border: none;
  outline: none;
  font-size: 1.042vw; /* 20px */
  background-color: transparent;
`;

const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.042vw; /* 20px */
  align-items: center;
`;

const Text = styled.textarea`
  width: 69.479vw; /* 1334px */
  height: 12.396vw; /* 238px */
  border-radius: 0.521vw; /* 10px */
  border: 0.052vw solid #9f9f9f; /* 1px */
  font-size: 1.042vw; /* 20px */
  padding-left: 1.406vw; /* 27px */
  padding-top: 1.354vw; /* 26px */
  padding-right: 1.406vw; /* 27px */

  &::placeholder {
    color: #4f4f4f;
    font-weight: 400;
    font-size: 1.042vw; /* 20px */
  }
`;

const Dday = styled.div``;

const Tag = styled.div`
  display: flex;
  column-gap: 2.135vw; /* 41px */
`;

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.833vw; /* 16px */
`;

const Date = styled.input`
  width: 12.396vw; /* 238px */
  height: 2.604vw; /* 50px */
  border-radius: 0.26vw; /* 5px */
  border: 0.052vw solid #9f9f9f; /* 1px */
  font-size: 1.042vw; /* 20px */
  font-weight: 400;
  color: #4f4f4f;
`;

const Short = styled.span`
  font-weight: 400;
  font-size: 1.042vw; /* 20px */
  color: #8b8b8b;
  margin-left: 0.521vw; /* 10px */
`;

const Long = styled.div`
  display: flex;
  column-gap: 0.521vw; /* 10px */
  margin-bottom: 1.146vw; /* 22px */
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 1.563vw; /* 30px */
`;

const TagName = styled.div`
  font-weight: 400;
  font-size: 1.563vw; /* 30px */
  margin-top: 0.625vw; /* 12px */
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4.167vw; /* 80px */
  margin-top: 2.969vw; /* 57px */
  margin-bottom: 4.167vw; /* 80px */
`;

const Buttons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15.052vw; /* 289px */
  height: 3.958vw; /* 76px */
  border-radius: 0.521vw; /* 10px */
  border: 0;
  background-color: #41c3ab;
  color: white;
  font-size: 1.563vw; /* 30px */
  font-weight: 600;
  margin-bottom: 4.167vw; /* 80px */
`;

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 69.479vw; /* 1334px */
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
  width: 69.479vw; /* 1334px */
`;

const TitleDiv = styled.input`
  font-size: 2.083vw; /* 40px */
  color: #9f9f9f;
  border: none;
  border-bottom: 0.104vw solid #9f9f9f; /* 2px */
  margin-bottom: 4.167vw; /* 80px */
  padding-bottom: 0.521vw; /* 10px */

  &::placeholder {
    font-size: 2.083vw; /* 40px */
    color: #9f9f9f;
  }
`;

export default ContentEditPage;

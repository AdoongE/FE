import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddCategory from './dropdown/AddCategoryDropdown';
import checkIcon from '../assets/icons/Check.png';
import { FaArrowRight } from 'react-icons/fa';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NewAddCategoryModal from './modal/NewAddCategoryModal';
import AddTagModal from './modal/AddTagModal';
import ContentSaveModal from './modal/ContentSaveModal';
import LinkUploader from './LinkUploader';
import PdfUploadComponent from './PdfUpload';
import ImageUploadComponent from './ImageUpload';
import { ContentAddHandler } from './api/ContentAddApi';
import { useNavigate } from 'react-router-dom';

function AddContent({ onSetRepresentativeImage }) {
  const [dataType, setDataType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [representativeIndex, setRepresentativeIndex] = useState(0);
  const [pendingOption, setPendingOption] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFirstSelection, setIsFirstSelection] = useState(true);
  const [tags, setTags] = useState([]);
  const [isComposing, setIsComposing] = useState(false); // 한국어 태그 이슈 해결을 위한
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

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
    if (onSetRepresentativeImage) {
      onSetRepresentativeImage(index); // 부모 컴포넌트로 콜백 전달
    }
  };

  const handlePdf = (index) => {
    setRepresentativeIndex(index); // 대표 파일 인덱스 관리
    setValue('thumbnailImage', index, { shouldValidate: true }); // Form 값 설정
    trigger('thumbnailImage');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    window.history.back();
  };

  const dialogRef = useRef(null);
  const TagRef = useRef(null);
  const SaveRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  const showTagModal = () => {
    TagRef.current?.showModal();
  };

  const showSaveModal = () => {
    SaveRef.current?.showModal();
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

  const schema = yup.object().shape({
    dataType: yup
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
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      dataType: '',
      thumbnailImage: 0,
      contentName: '',
      boardCategory: [],
      contentLink: '',
      tags: [],
      dday: null,
      contentDetail: null,
    },
  });

  const closeChangeOption = () => {
    setIsModalVisible(false);
    setPendingOption(null);
  };

  const handleCheckboxChange = (event) => {
    const option = event.target.name;

    if (isFirstSelection) {
      setDataType(option);
      setIsFirstSelection(false);
      setValue('dataType', option, { shouldValidate: true });
      trigger('dataType');
    } else if (dataType !== option) {
      setPendingOption(option);
      setIsModalVisible(true);
    }
  };

  const handleConfirmChange = () => {
    if (pendingOption && pendingOption !== dataType) {
      setDataType(pendingOption);
      reset({
        dataType: pendingOption,
        thumbnailImage: 0,
        contentName: '',
        boardCategory: [],
        contentLink: '',
        tags: [],
        dday: null,
        contentDetail: null,
      });

      setTags([]);

      setTimeout(() => {
        trigger([
          'dataType',
          'thumbnailImage',
          'boardCategory',
          'contentLink',
          'tags',
        ]);
      }, 0);

      setPendingOption(null);
      setIsModalVisible(false);

      if (TagRef.current) {
        TagRef.current.resetTags();
      }
    }
  };

  useEffect(() => {
    if (dataType) {
      trigger();
    }
  }, [dataType]);

  const onSubmit = (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    trigger();
    if (!isValid) return;
    try {
      let updateData = {
        dataType: data.dataType,
        contentName: data.contentName,
        boardCategory: data.boardCategory,
        tags: data.tags,
        dday: data.dday || null,
        contentDetail: data.contentDetail || null,
      };

      if (dataType === 'LINK') {
        updateData.contentLink = data.contentLink;
      } else {
        updateData.thumbnailImage = representativeIndex; // 대표 이미지 포함
      }

      ContentAddHandler(data.dataType, updateData, images, files);
      if (TagRef.current) {
        TagRef.current.resetTags();
      }
      navigate('/main');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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

  return (
    <form noValidate>
      <MainDiv>
        <LeftDiv>
          <TitleDiv
            placeholder="제목을 입력하세요 (선택)"
            type="text"
            name="contentName"
            {...register('contentName')}
          />

          <Label>저장할 콘텐츠의 형식을 선택하세요.</Label>
          <Group>
            <CheckboxLabel>
              <TypeBox
                type="checkbox"
                name="LINK"
                checked={dataType === 'LINK'}
                onChange={handleCheckboxChange}
              />
              <span>링크</span>
            </CheckboxLabel>
            <CheckboxLabel>
              <TypeBox
                type="checkbox"
                name="IMAGE"
                checked={dataType === 'IMAGE'}
                onChange={handleCheckboxChange}
              />
              <span>이미지</span>
            </CheckboxLabel>
            <CheckboxLabel>
              <TypeBox
                type="checkbox"
                name="PDF"
                checked={dataType === 'PDF'}
                onChange={handleCheckboxChange}
              />
              <span>PDF</span>
            </CheckboxLabel>
            {isModalVisible && (
              <Backdrop onClick={() => setIsModalOpen(false)}>
                <OptionDialog ref={ChangeRef}>
                  <ChangeTitle>
                    {pendingOption === 'LINK'
                      ? '링크'
                      : pendingOption === 'IMAGE'
                        ? '이미지'
                        : 'PDF'}{' '}
                    모드로 변경하시겠습니까?
                  </ChangeTitle>
                  <ShortTitle>
                    지금까지 설정한 모든 항목이 초기화됩니다.
                  </ShortTitle>
                  <ChangeButtons>
                    <No onClick={closeChangeOption}>취소</No>
                    <Yes onClick={handleConfirmChange}>확인</Yes>
                  </ChangeButtons>
                </OptionDialog>
              </Backdrop>
            )}
          </Group>
        </LeftDiv>
        <RightDiv>
          <Button type="button" onClick={openModal}>
            나가기
            <ArrowIcon />
          </Button>
        </RightDiv>
        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <Icon
                icon="ph:warning-circle-thin"
                width="148"
                height="148"
                style={{ color: '#41c3ab', marginBottom: 34 }}
              />
              <ModalTitle>지금 나가시겠습니까?</ModalTitle>
              <ModalText>지금까지 설정한 모든 항목이 초기화됩니다.</ModalText>
              <ButtonContainer>
                <ModalButton type="button" className="no" onClick={closeModal}>
                  취소
                </ModalButton>
                <ModalButton
                  type="button"
                  className="ok"
                  onClick={handleConfirm}
                >
                  확인
                </ModalButton>
              </ButtonContainer>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainDiv>

      {!isFirstSelection && (
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
                        ref={dialogRef}
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
              <ImageUploadComponent
                onSetRepresentative={handleImage}
                images={images}
                setImages={setImages}
              />
            )}
            {dataType === 'PDF' && (
              <PdfUploadComponent
                onSetRepresentative={handlePdf}
                file={files}
                setFiles={setFiles}
              />
            )}
            <Tag>
              <TagName>태그 (2개 이상)*</TagName>
              <TagInputs>
                <TagDiv>
                  <TagContainer>
                    <Controller
                      name="tags"
                      control={control}
                      defaultValue={[]}
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
                            originalTags={[]}
                            title={'태그를 선택하세요.'}
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
            <Buttons
              disabled={!isValid}
              type="button"
              onClick={() => {
                if (isValid) {
                  showSaveModal();
                }
              }}
            >
              저장하기
            </Buttons>
          </ButtonContainers>
          <ContentSaveModal ref={SaveRef} onConfirm={handleSubmit(onSubmit)} />
        </ContentPage>
      )}
    </form>
  );
}

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
  /* margin-right: 10px; */
  margin: 4px 4px;
`;

const TagP = styled.p`
  font-size: 20px;
`;

const ButtonContainers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShortTitle = styled.div`
  font-weight: 400;
  font-size: 26px;
  color: #4f4f4f;
  margin-bottom: 53px;
`;
const ChangeButtons = styled.div`
  display: flex;
  column-gap: 17px;
`;

const No = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 54px;
  background-color: #f2f2f2;
  color: #4f4f4f;
  font-size: 22px;
  font-weight: 500;
  border-radius: 10px;
  border: 0;
`;

const Yes = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 54px;
  background-color: #41c3ab;
  color: white;
  font-size: 22px;
  font-weight: 500;
  border-radius: 10px;
  border: 0;
`;

const ChangeTitle = styled.div`
  font-weight: 600;
  font-size: 40px;
  margin-bottom: 16px;
`;

const OptionDialog = styled.dialog`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 74px 202px;
  width: 650px;
  height: 280px;
  background-color: white;
  border: 0;
  border-radius: 50px;

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 배경보다 위로 오도록 설정 */
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
  &:focus {
    outline: none;
  }

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
  width: 404px;
  height: 76px;
  border-radius: 10px;
  border: 0;
  background-color: #41c3ab;
  color: white;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 80px;

  &:disabled {
    background-color: #dcdada;
    color: #9f9f9f;
  }
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
  margin-bottom: 1.813rem;
  padding-bottom: 10px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 40px;
    color: #9f9f9f;
  }
`;

const Label = styled.label`
  font-size: 24px;
  color: #9f9f9f;
  margin-bottom: 0.938rem;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    font-size: 24px;
    color: #4f4f4f;
  }
`;

const TypeBox = styled.input`
  width: 28px;
  height: 28px;
  cursor: pointer;
  appearance: none;
  border: 1px solid #9f9f9f;
  border-radius: 5px;

  &:checked {
    background-color: #41c3ab;
    border: none;
    background-image: url(${checkIcon});
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const RightDiv = styled.div`
  position: absolute;
  right: 0;
  top: 16vh;
  padding-right: 64px;
`;

const Button = styled.button`
  width: 152px;
  height: 57px;
  color: #4f4f4f;
  font-size: 24px;
  font-weight: 500;
  background-color: #dcdada;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const ArrowIcon = styled(FaArrowRight)`
  font-size: 24px;
  color: #4f4f4f;
  transform: scale(0.7);
`;

// 모달 관련 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 50px;
  width: 56.25rem;
  height: 32.438rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
  font-size: 40px;
  font-weight: 850;
  font-family: 'Pretendard-Regular';
  margin-bottom: 0.625rem;
`;

const ModalText = styled.h2`
  font-size: 26px;
  color: #4f4f4f;
  font-family: 'Pretendard-Regular';
  margin-bottom: 1.875rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ModalButton = styled.button`
  height: 3.75rem;
  width: 9.125rem;
  font-size: 22px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &.ok {
    background-color: #41c3ab;
    color: white;
  }
  &.no {
    background-color: #f2f2f2;
    color: black;
  }
`;

export default AddContent;

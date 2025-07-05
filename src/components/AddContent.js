import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddCategory from './dropdown/AddCategoryDropdown';
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
import { useNavigate, useLocation } from 'react-router-dom';
import { font } from '../styles/font';

function AddContent() {
  const location = useLocation();
  const [seedType, setSeedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const representativeIndex = location.state?.representativeIndex || 0;
  const [tags, setTags] = useState([]);
  const [isComposing, setIsComposing] = useState(false); // 한국어 태그 이슈 해결을 위한
  const [isSubmitting, setIsSubmitting] = useState(false);
  const images = location.state?.images || [];
  const files = location.state?.files || [];
  const navigate = useNavigate();

  const { title } = location.state || '';
  const { summary } = location.state || '';
  const recoTags = location.state?.tags || [];
  const { link } = location.state || '';

  useEffect(() => {
    console.log(
      '콘텐츠 생성 페이지로',
      link,
      tags,
      title,
      images,
      files,
      representativeIndex,
    );
    let option = '';
    if (images.length > 0) {
      setSeedType('IMAGE');
      option = 'IMAGE';
    } else if (files.length > 0) {
      setSeedType('PDF');
      option = 'PDF';
    } else if (link !== '') {
      setSeedType('LINK');
      option = 'LINK';
    }
    setValue('seedType', option, { shouldValidate: true });
    setValue('seedName', title);
    setValue('seedLink', link);
    setValue('thumbnailImage', representativeIndex, { shouldValidate: true });
    setValue('seedDetail', summary);
    trigger('thumbnailImage');
  }, []);

  const handleRecoTagClick = (event, tag) => {
    event.preventDefault();
    if (!tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      setValue('tags', updatedTags);
    }
  };

  const handleAddTag = (newTags) => {
    const updatedTags = [
      ...tags,
      ...newTags.filter((tag) => !tags.includes(tag)),
    ];
    setTags(updatedTags);
    setValue('tags', updatedTags);
  };

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
    seedName: yup.string(),
    categoryNames: yup
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
          const { seedType } = this.parent;
          if (seedType === 'IMAGE' || seedType === 'PDF') {
            return value !== null && value !== undefined;
          }
          return true;
        },
      ),
    seedLink: yup
      .string()
      .nullable()
      .test('is-link-required', '링크를 입력해주세요.', function (value) {
        const { seedType } = this.parent;
        if (seedType === 'LINK') {
          return value && value.trim() !== '';
        }
        return true;
      }),
    tags: yup
      .array()
      .of(yup.string())
      .min(2, '2개 이상의 태그를 선택해주세요.')
      .required(),
    dDay: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: '유효한 날짜 형식이어야 합니다.',
        excludeEmptyString: true,
      })
      .nullable()
      .notRequired(),
    seedDetail: yup.string().max(1500).nullable().notRequired(),
  });

  const {
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
      seedType: '',
      thumbnailImage: 0,
      seedName: '',
      categoryNames: [],
      seedLink: '',
      tags: [],
      dDay: null,
      seedDetail: null,
    },
  });

  useEffect(() => {
    if (seedType) {
      trigger();
    }
  }, [seedType]);

  const onSubmit = (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    trigger();
    if (!isValid) return;
    try {
      let updateData = {
        seedType: data.seedType,
        seedName: data.seedName,
        boardCategories: data.boardCategories,
        tags: data.tags,
        dDay: data.dDay || null,
        seedDetail: data.seedDetail || null,
      };

      if (seedType === 'LINK') {
        updateData.seedLink = data.seedLink;
      } else {
        updateData.thumbnailImage = representativeIndex; // 대표 이미지 포함
      }

      ContentAddHandler(data.seedType, updateData, images, files);
      if (TagRef.current) {
        TagRef.current.resetTags();
      }
      navigate('/main');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const seedDetail = watch('seedDetail', '');

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
            name="seedName"
            {...register('seedName')}
          />
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
              <CloseIcon icon="ph:warning-circle-thin" />
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

      <ContentPage>
        <Contents>
          <Inputs>
            <Name>카테고리 지정*</Name>
            <Inputs>
              <Controller
                name="categoryNames"
                control={control}
                defaultValue={[]}
                render={({ field, fieldState }) => (
                  <>
                    <AddCategory
                      label="categoryNames"
                      $error={fieldState.error ? true : undefined}
                      $helperText={fieldState.error && fieldState.error.message}
                      value={field.value || []}
                      onChange={(newValue) => {
                        if (newValue.length <= 5) {
                          field.onChange(newValue);
                          trigger('categoryNames');
                        }
                      }}
                    />
                    <InputButton type="button" onClick={() => showModal(field)}>
                      + 카테고리 추가
                    </InputButton>
                    <NewAddCategoryModal
                      ref={dialogRef}
                      onConfirm={(newCategory) => {
                        if (field.value.length < 5) {
                          field.onChange([...field.value, newCategory.trim()]);
                        }
                      }}
                    />
                  </>
                )}
              />
            </Inputs>
          </Inputs>

          {seedType === 'LINK' && (
            <Controller
              name="seedLink"
              control={control}
              render={({ field, fieldState }) => (
                <LinkUploader
                  label="seedLink"
                  $error={fieldState.error ? true : undefined}
                  $helperText={fieldState.error && fieldState.error.message}
                  value={link || ''}
                  onChange={(value) => {
                    field.onChange(value);
                    trigger('seedLink');
                  }}
                />
              )}
            />
          )}
          {seedType === 'IMAGE' && (
            <ImageUploadComponent
              representativeIndex={representativeIndex}
              images={images}
            />
          )}
          {seedType === 'PDF' && (
            <PdfUploadComponent
              representativeIndex={representativeIndex}
              files={files}
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
                            <CancelIcon
                              icon="ic:round-close"
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
                          onConfirm={handleAddTag}
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
                <div>
                  {recoTags.length === 0 ? (
                    <div
                      style={{
                        padding: '3px 8px',
                        backgroundColor: 'var(--gray3)',
                        color: '#ff0000',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontSize: '12px',
                      }}
                    >
                      태그 추천 불가
                    </div>
                  ) : (
                    recoTags.map((tag, idx) => (
                      <button
                        key={idx}
                        style={{
                          display: 'inline-block',
                          padding: '3px 8px',
                          marginRight: '6px',
                          backgroundColor: 'var(--gray3)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: 'var(--gray1)',
                          fontWeight: '600',
                          fontSize: '12px',
                          border: 'none',
                        }}
                        onClick={(event) => handleRecoTagClick(event, tag)}
                      >
                        {tag}
                      </button>
                    ))
                  )}
                </div>
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
            <Date type="date" {...register('dDay')} defaultValue={null} />
          </Dday>
          <Memo>
            <Name>메모 입력</Name>
            <div>
              <Text
                defaultValue={null}
                maxLength={1500}
                name="seedDetail"
                type="text"
                {...register('seedDetail')}
                placeholder="메모를 입력하세요."
              />
              <Count>{seedDetail === null ? 0 : seedDetail.length}/1500</Count>
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
    </form>
  );
}

const Chip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 0;
  border-radius: 4px;
  background-color: var(--green2);
  padding: 6.5px 12px;
  gap: 4px;
`;

const TagP = styled.p`
  ${font.title3}
`;

const CancelIcon = styled(Icon)`
  width: 18px;
  height: 18px;
  color: white;
`;

const ButtonContainers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Count = styled.div`
  width: fit-content;
  ${font.title4}
  color: var(--gray2);
  transform: translateX(940px) translateY(-35px);
`;

const Recommend = styled.div`
  ${font.body2}
  color: var(--gray1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Recommends = styled.div`
  display: flex;
  column-gap: 12px;
`;

const InputButton = styled.button`
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  ${font.title3}
  background-color: var(--gray2);
  padding: 8px 12px;
`;

const TagContainer = styled.div`
  width: 452px;
  border: 0.6px solid var(--gray2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px;
  gap: 10px;
`;

const TagInputs = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const TagInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  ${font.title4}
  background-color: transparent;
  padding: 6px;
`;

const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const Text = styled.textarea`
  width: 1000px;
  height: 182px;
  border-radius: 8px;
  border: 0.6px solid var(--gray1);
  ${font.title4}
  padding: 14px 16px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: var(--gray2);
  }
`;

const Dday = styled.div``;

const Tag = styled.div`
  display: flex;
  column-gap: 46px;
`;

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const Date = styled.input`
  padding: 7px 12px;
  border-radius: 8px;
  border: 0.6px solid var(--gray2);
  ${font.title4}
  color: var(--gray1);
`;

const Short = styled.span`
  ${font.body2}
  color: var(--gray2);
  margin-left: 8px;
`;

const Long = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 20px;
`;

const TagName = styled.div`
  font-size: 20px;
  margin-top: 12px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 60px;
  margin-top: 60px;
  margin-bottom: 80px;
`;

const Buttons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 0;
  background-color: var(--green2);
  color: white;
  ${font.title1}
  margin-bottom: 60px;
  padding: 12px 85px;

  &:disabled {
    background-color: var(--gray3);
    color: var(--gray2);
  }
`;

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 1000.5px;
`;

const TitleDiv = styled.input`
  font-size: 24px;
  color: #9f9f9f;
  border: none;
  border-bottom: 1px solid var(--gray2);
  padding-bottom: 16px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 24px;
    color: #9f9f9f;
  }
`;

const RightDiv = styled.div`
  position: absolute;
  right: 0;
  top: 132px;
  padding-right: 48px;
`;

const Button = styled.button`
  padding: 10.5px 21px;
  color: var(--gray1);
  font-size: 16px;
  background-color: var(--gray3);
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ArrowIcon = styled(FaArrowRight)`
  font-size: 16px;
  color: var(--gray1);
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
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 44px 161px;
`;

const CloseIcon = styled(Icon)`
  width: 100px;
  height: 100px;
  color: var(--green2);
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  ${font.title0}
  margin-bottom: 8px;
`;

const ModalText = styled.h2`
  ${font.title4}
  color: var(--gray1);
  text-align: center;
  margin-bottom: 26px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ModalButton = styled.button`
  padding: 10.5px 32px;
  ${font.title3}
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &.ok {
    background-color: var(--green2);
    color: white;
  }
  &.no {
    background-color: var(--gray4);
    color: black;
  }
`;

export default AddContent;

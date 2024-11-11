import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddCategory from './dropdown/AddCategoryDropdown';

import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NewAddCategoryModal from './modal/NewAddCategoryModal';
import AddTagModal from './modal/AddTagModal';
import ContentSaveModal from './modal/ContentSaveModal';
import LinkUploader from './LinkUploader';

// import Box from '@mui/material/Box';

function AddContent() {
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

  const schema = yup.object().shape({
    boardCategory: yup
      .array()
      .of(yup.string())
      .max(5, '최대 5개의 항목만 선택 가능합니다')
      .required(),
    contentLink: yup.string().required(),
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
    contentDetail: yup.string().max(1500),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('콘텐츠 값', data);
  };

  const contentDetail = watch('contentDetail', '');

  const formValues = watch();
  useEffect(() => {
    console.log('현재 폼 값:', formValues);
  }, [formValues]);

  useEffect(() => {
    console.log('현재 isValid 상태:', isValid);
  }, [isValid]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                      $helperText={fieldState.error && fieldState.error.message}
                      value={field.value || []}
                      onChange={(newValue) => {
                        if (newValue.length <= 5) {
                          field.onChange(newValue);
                        }
                      }}
                    />
                    <InputButton onClick={() => showModal(field)}>
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

          <Controller
            name="contentLink"
            control={control}
            render={({ field, fieldState }) => (
              <LinkUploader
                label="contentLink"
                $error={fieldState.error ? true : undefined}
                $helperText={fieldState.error && fieldState.error.message}
                value={field.value || []}
                onChange={field.onChange}
              />
            )}
          />

          <Tag>
            <TagName>태그 (2개 이상)*</TagName>
            <TagInputs>
              <TagContainer>
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={[]}
                  render={({ field, fieldState }) => (
                    <>
                      <TagInput
                        label="tags"
                        $error={fieldState.error ? true : undefined}
                        $helperText={
                          fieldState.error && fieldState.error.message
                        }
                        placeholder="태그 입력 후 엔터, 최대 8자, 띄어쓰기 불가"
                        value={field.value || []}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                      />
                      {/* <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.5,
                          mt: 1,
                        }}
                      >
                        {field.value.map((tag) => (
                          <Chip key={tag}>
                            {tag}
                            <Icon
                              icon="ic:round-close"
                              style={{
                                width: '24px',
                                height: '24px',
                                color: 'white',
                              }}
                              onMouseDown={() => handleDelete(tag, field)}
                            />
                          </Chip>
                        ))}
                      </Box>
                      <InputButton onClick={() => showTagModal(field)}>
                        + 태그 선택
                      </InputButton>
                      <AddTagModal
                        ref={TagRef}
                        onConfirm={(newTag) => {
                          field.onChange([...field.value, newTag]);
                        }}
                      /> */}
                      <InputButton onClick={() => showTagModal(field)}>
                        + 태그 선택
                      </InputButton>
                      <AddTagModal
                        ref={TagRef}
                        onConfirm={(newTag) => {
                          field.onChange([
                            ...new Set([...field.value, ...newTag]),
                          ]);
                        }}
                      />
                    </>
                  )}
                />
              </TagContainer>
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
            <Date type="date" {...register('dDay')} defaultValue={null} />
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
                placeholder="메모를 입력하세요"
              />
              <Count>{contentDetail.length}/1500</Count>
            </div>
          </Memo>
        </Contents>
        <Button
          disabled={!isValid}
          type="button"
          onClick={() => {
            if (isValid) {
              showSaveModal();
            }
          }}
        >
          저장하기
        </Button>
        <ContentSaveModal ref={SaveRef} onConfirm={handleSubmit(onSubmit)} />
      </ContentPage>
    </form>
  );
}

// const Chip = styled.div`
//   width: fit-content;
//   height: 44px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   border: 0;
//   border-radius: 5px;
//   column-gap: 5px;
//   background-color: #41c3ab;
//   padding-left: 16px;
//   padding-right: 16px;
// `;

const Count = styled.div`
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
  padding: 10px 16px;
`;

const TagContainer = styled.div`
  width: 794px;
  height: 60px;
  border: 1px solid #9f9f9f;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  opacity: 1;
  padding-left: 12px;
  padding-right: 10px;
`;

const TagInputs = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const TagInput = styled.input`
  width: 625px;
  height: 50px;
  border: none;
  -webkit-appearance: none;
  appearance: none;
  overflow: auto;
  z-index: -1;

  &::placeholder {
    font-size: 20px;
    font-weight: 400;
    color: #4f4f4f;
    margin: 18px 18px;
  }
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

const Button = styled.button`
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
  /* justify-content: center; */
  align-items: center;
  margin-left: 443px;
`;

export default AddContent;

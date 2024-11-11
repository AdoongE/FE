import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import AddCategory from './dropdown/AddCategoryDropdown';

import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import NewAddCategoryModal from './modal/NewAddCategoryModal';
import AddTagModal from './modal/AddTagModal';

function AddContent() {
  const dialogRef = useRef(null);
  const TagRef = useRef(null);

  const showModal = () => {
    dialogRef.current?.showModal();
  };

  const showTagModal = () => {
    TagRef.current?.showModal();
  };

  const schema = yup.object().shape({
    dDay: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, '생년원일은 필수 항목입니다.'),
    boardCategory: yup
      .array()
      .of(yup.string())
      .max(5, '최대 5개의 항목만 선택 가능합니다')
      .required(),
  });

  const { register, handleSubmit, control, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('콘텐츠 값', data);
  };

  const formValues = watch();
  useEffect(() => {
    console.log('현재 폼 값:', formValues);
  }, [formValues]);

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
                      카테고리 추가
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
          <Inputs>
            <Name>링크 업로드*</Name>
          </Inputs>
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
                      <InputButton onClick={() => showTagModal(field)}>
                        + 태그 선택
                      </InputButton>
                      <AddTagModal
                        ref={TagRef}
                        onConfirm={(newCategory) => {
                          field.onChange([...field.value, newCategory]);
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
            <Date type="date" {...register('dDay')} />
          </Dday>
          <Memo>
            <Name>메모 입력</Name>
            <Text placeholder="메모를 입력하세요"></Text>
          </Memo>
        </Contents>
        <Button>저장하기</Button>
      </ContentPage>
    </form>
  );
}

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
`;

const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AddContent;

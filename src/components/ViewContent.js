import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

function ViewContent() {
  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };
  return (
    <>
      <ContentPage>
        <Contents>
          <TitleDiv>에어비엔비 광고 레퍼런스</TitleDiv>
          <ContentDiv>
            <Name>카테고리</Name>
            <Category>카테고리1</Category>
            <Category>카테고리2</Category>
          </ContentDiv>
          <ContentDiv>
            <Name>링크</Name>
            <Link
              onClick={() =>
                handleLinkClick('https://www.youtube.com/watch?v=0cICRaWZFxk')
              }
            >
              <Icon
                icon="ic:twotone-link"
                width="24"
                height="24"
                style={{
                  color: '#4f4f4f',
                  marginRight: '10px',
                  paddingBottom: '3px',
                  verticalAlign: 'middle',
                }}
              />
              https://www.youtube.com/watch?v=0cICRaWZFxk
            </Link>
          </ContentDiv>
          <Tag>
            <TagName>태그 (2개 이상)*</TagName>
            {/* <TagInputs>
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
            </TagInputs> */}
          </Tag>
          <Dday>
            <Long>
              <Name className="dday">
                디데이
                <Short>
                  디데이를 입력하면 해당 날짜에 알림을 받을 수 있습니다.
                </Short>
              </Name>
            </Long>
          </Dday>
          <Memo>
            <Name>메모 입력</Name>
            <Text placeholder="메모를 입력하세요"></Text>
          </Memo>
        </Contents>
        <Button>수정하기</Button>
      </ContentPage>
    </>
  );
}

// const InputButton = styled.button`
//   width: fit-content;
//   height: 44.19px;
//   border-radius: 10px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid #9f9f9f;
//   color: white;
//   font-weight: 500;
//   font-size: 20px;
//   background-color: #9f9f9f;
//   padding: 10px 16px;
// `;

// const TagContainer = styled.div`
//   width: 794px;
//   height: 60px;
//   border: 1px solid #9f9f9f;
//   border-radius: 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   z-index: 1;
//   opacity: 1;
//   padding-left: 12px;
//   padding-right: 10px;
// `;

// const TagInputs = styled.div`
//   display: flex;
//   flex-direction: column;
//   row-gap: 15px;
// `;

// const TagInput = styled.input`
//   width: 625px;
//   height: 50px;
//   border: none;
//   -webkit-appearance: none;
//   appearance: none;
//   overflow: auto;
//   z-index: -1;

//   &::placeholder {
//     font-size: 20px;
//     font-weight: 400;
//     color: #4f4f4f;
//     margin: 18px 18px;
//   }
// `;
const ContentPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 60px;
  margin-top: 57px;
  margin-bottom: 80px;
`;

const TitleDiv = styled.p`
  font-size: 40px;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #41c3ab;
  width: 111px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  margin-right: 20px;
`;

const Link = styled.div`
  font-size: 20px;
  color: #4f4f4f;
  border-bottom: 1px solid #9f9f9f;
  padding-bottom: 8px;
  cursor: pointer;
  display: inline-block;
  width: fit-content;
  &:hover {
    color: #41c3ab;
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

const Short = styled.span`
  font-weight: 400;
  font-size: 20px;
  color: #8b8b8b;
  margin-left: 10px;
  width: 300px;
`;

const Long = styled.div`
  display: flex;
  column-gap: 10px;
  margin-bottom: 22px;
`;

const Name = styled.div`
  font-weight: 400;
  font-size: 30px;
  width: 238px;
  &.dday {
    width: 550px;
  }
`;

const TagName = styled.div`
  font-weight: 400;
  font-size: 30px;
  margin-top: 12px;
`;

const Button = styled.button`
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
  font-weight: 500;
`;

export default ViewContent;

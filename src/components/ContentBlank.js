import styled from 'styled-components';
import { React } from 'react';
import { useNavigate } from 'react-router-dom';

function ContentBlank() {
  const navigate = useNavigate();

  const handleNewContentClick = () => {
    navigate('/content-add');
  };

  return (
    <Blank>
      <Sentence>
        다시 보고 싶은 링크와 사진들,
        <br />
        여기저기 저장하지 말고 이젠 한 곳에서 관리하세요!
      </Sentence>
      <NewContentButton onClick={handleNewContentClick}>
        + 새 콘텐츠 저장하기
      </NewContentButton>
    </Blank>
  );
}

const Blank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Sentence = styled.div`
  font-weight: 500;
  font-size: 32px;
  text-align: center;
  color: #4f4f4f;
  line-height: 46px;
`;

const NewContentButton = styled.button`
  width: 404px;
  height: 76px;
  margin-top: 44px;
  color: white;
  background-color: #41c3ab;
  text-align: center;
  border-radius: 20px;
  font-weight: 600;
  font-size: 30px;
  border: 0;
`;

export default ContentBlank;

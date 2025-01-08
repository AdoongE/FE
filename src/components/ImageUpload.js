import React from 'react';
import styled from 'styled-components';

const ImageUploadComponent = ({ representativeIndex, images }) => {
  return (
    <Wrapper>
      <Instructions>
        이미지 업로드*{' '}
        <span>
          최대 10MB 이하의 JPG, JPEG, PNG, SVG 파일만 첨부할 수 있습니다.
        </span>
      </Instructions>
      <ImagesWrapper>
        {images.map((image, index) => (
          <ImageContainer key={image.id}>
            <ImageBox>
              {index === representativeIndex && (
                <RepresentativeLabel>대표</RepresentativeLabel>
              )}
              <ImagePreview src={image.preview} alt={image.label} />
            </ImageBox>
            <FileName>{image.label}</FileName>
          </ImageContainer>
        ))}
      </ImagesWrapper>
    </Wrapper>
  );
};

export default ImageUploadComponent;

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const Instructions = styled.p`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 16px;

  span {
    font-size: 18px;
    color: #999;
    font-weight: normal;
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 1100px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 159px;
  height: 177px;
  position: relative;
  background-color: #f0f0f0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RepresentativeLabel = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: #47c28b;
  color: white;
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 12px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const FileName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  text-align: center;
  width: 140px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

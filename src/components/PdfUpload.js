import React from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { font } from '../styles/font';

const PdfUploadComponent = ({ representativeIndex, files = [] }) => {
  return (
    <Wrapper>
      <Instructions>
        PDF 파일 업로드*{' '}
        <span>최대 10MB 이하의 PDF 파일만 첨부할 수 있습니다.</span>
      </Instructions>
      <FilesWrapper>
        {files.map((file, index) => (
          <FileContainer key={file.id}>
            <FileBox>
              {index === representativeIndex && (
                <RepresentativeLabel>대표</RepresentativeLabel>
              )}
              <FileIcon>
                <Icon
                  icon="mdi-light:file"
                  width="40px"
                  height="40px"
                  style={{ color: '#9F9F9F' }}
                />
              </FileIcon>
            </FileBox>
            <FileName>{file.label}</FileName>
          </FileContainer>
        ))}
      </FilesWrapper>
    </Wrapper>
  );
};

export default PdfUploadComponent;

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const Instructions = styled.p`
  ${font.title1}
  margin-bottom: 15px;

  span {
    ${font.body2}
    color: var(--gray2);
    font-weight: normal;
  }
`;

const FilesWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 1000px;
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileBox = styled.div`
  width: 140px;
  height: 132px;
  position: relative;
  background-color: #eaf4f4;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
`;

const RepresentativeLabel = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: #47c28b;
  color: white;
  padding: 2px 6px;
  font-size: 10px;
  border-radius: 20px;
`;

const FileIcon = styled.div`
  color: #4caf50;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const FileName = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: var(--gray2);
  text-align: center;
  width: 140px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

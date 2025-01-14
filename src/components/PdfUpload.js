import React from 'react';
import { Icon } from '@iconify/react';
import styled from 'styled-components';

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
                  width="2.604vw"
                  height="2.604vw"
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
  font-size: 1.563vw; /* 30px */
  font-weight: 400;
  margin-bottom: 0.833vw; /* 16px */

  span {
    font-size: 0.938vw; /* 18px */
    color: #999;
    font-weight: normal;
  }
`;

const FilesWrapper = styled.div`
  display: flex;
  gap: 1.563vw; /* 30px */
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.781vw; /* 15px */
  border: 0.052vw solid #ddd; /* 1px */
  border-radius: 0.417vw; /* 8px */
  width: 100%;
  max-width: 57.292vw; /* 1100px */
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileBox = styled.div`
  width: 8.281vw; /* 159px */
  height: 9.219vw; /* 177px */
  position: relative;
  background-color: #eaf4f4;
  border-radius: 0.208vw; /* 4px */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
`;

const RepresentativeLabel = styled.div`
  position: absolute;
  top: 0.26vw; /* 5px */
  left: 0.26vw; /* 5px */
  background-color: #47c28b;
  color: white;
  padding: 0.104vw 0.313vw; /* 2px 6px */
  font-size: 0.625vw; /* 12px */
  border-radius: 0.625vw; /* 12px */
`;

const FileIcon = styled.div`
  color: #4caf50;
  font-size: 2.604vw; /* 50px */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.417vw; /* 8px */
`;

const FileName = styled.div`
  margin-top: 0.417vw; /* 8px */
  font-size: 0.729vw; /* 14px */
  color: #666;
  text-align: center;
  width: 7.292vw; /* 140px */
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

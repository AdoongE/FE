import React from 'react';
import { ContentImage, Dday, Dropdown, ImageBox, PDFThumbnail } from './style';
import { Document, Page } from 'react-pdf';
import defaultImage from 'assets/icons/seed_contentbox.png';
import ContentDropdown from './ContentDropdown';

function ImgBox({
  thumbnailImage,
  contentDateType,
  dDay,
  open,
  contentId,
  fetchData,
}) {
  return (
    <ImageBox>
      {contentDateType === 'PDF' ? (
        <PDFThumbnail onClick={open}>
          <Document file={thumbnailImage} loading={<div>Loading PDF...</div>}>
            <Page pageNumber={1} width={200} />
          </Document>
        </PDFThumbnail>
      ) : contentDateType === 'LINK' ? (
        <ContentImage
          src={defaultImage}
          alt="content thumbnail"
          onClick={() => window.open(thumbnailImage, '_blank')}
          isDefaultImage={true}
        />
      ) : (
        <ContentImage
          onClick={open}
          src={thumbnailImage || defaultImage}
          alt="content thumbnail"
          isDefaultImage={!thumbnailImage}
        />
      )}
      {dDay !== undefined && dDay <= 0 && (
        <Dday dDay={dDay}>{dDay === 0 ? 'D-DAY' : `D-${Math.abs(dDay)}`}</Dday>
      )}
      <Dropdown>
        <ContentDropdown contentId={contentId} fetchData={fetchData} />
      </Dropdown>
    </ImageBox>
  );
}

export default ImgBox;

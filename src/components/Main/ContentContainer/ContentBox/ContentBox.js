import React from 'react';
import { Box } from './style';
import ImgBox from './ImgBox';
import BoxInfo from './BoxInfo';

function ContentBox({
  contentId,
  title,
  category = [],
  tags,
  dDay,
  thumbnailImage,
  open,
  contentDateType,
  updatedDt,
  message,
  keyword,
  fetchData,
}) {
  return (
    <Box>
      <ImgBox
        thumbnailImage={thumbnailImage}
        contentDateType={contentDateType}
        open={open}
        dDay={dDay}
        contentId={contentId}
        fetchData={fetchData}
      />
      <BoxInfo
        title={title}
        category={category}
        tags={tags}
        message={message}
        keyword={keyword}
        contentDateType={contentDateType}
        updatedDt={updatedDt}
      />
    </Box>
  );
}

export default ContentBox;

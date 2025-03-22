import React from 'react';
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
    <div>
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
    </div>
  );
}

export default ContentBox;

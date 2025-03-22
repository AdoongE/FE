import React, { useEffect } from 'react';
import tagImage from 'assets/icons/tag.png';
import {
  CheckIcon,
  Notag,
  Option,
  Options,
  Short,
  TagContainer,
  TagImage,
  TagItem,
  Head,
  Icons,
  Title,
  HeaderIcon,
} from './style';
import { TagOption } from './tagOption';
import useTagStore from 'context/tagStore';

function SelectTag({ title, handleClose, originalTags }) {
  const {
    tags = [],
    selectedTags = [],
    selectedFilter,
    setTags,
    setSelectedFilter,
    setSelectedTags,
    addTag,
    resetTags,
  } = useTagStore();

  // useImperativeHandle(ref, () => ({
  //   removeTags: (tag) =>
  //     setSelectedTags((prevTags) => prevTags.filter((item) => item !== tag)),
  // }));

  useEffect(() => {
    setSelectedTags(originalTags || []);
    setTags();
  }, []);

  return (
    <div>
      <Head>
        <Title>{title}</Title>
        <Icons>
          <HeaderIcon icon="ri:reset-left-line" onClick={() => resetTags()} />
          <HeaderIcon icon="ic:round-close" onClick={handleClose} />
        </Icons>
      </Head>
      <div>
        <Options>
          <Option
            $isSelected={selectedFilter === '기본 태그'}
            onClick={() => setSelectedFilter('기본 태그')}
          >
            기본 태그
          </Option>
          <div>|</div>
          <Option
            $isSelected={selectedFilter === '나의 태그'}
            onClick={() => setSelectedFilter('나의 태그')}
          >
            나의 태그
          </Option>
        </Options>
        <Short>
          <CheckIcon icon="prime:check-square" />
          <div>적절한 태그를 선택해보세요!</div>
        </Short>
      </div>
      {selectedFilter === '기본 태그' ? (
        <TagContainer>
          {TagOption.map((tag, index) => (
            <TagItem
              type="button"
              key={index}
              onClick={() => addTag(tag)}
              $isSelected={selectedTags.includes(tag)}
            >
              {tag}
            </TagItem>
          ))}
        </TagContainer>
      ) : (
        <div>
          {Array.isArray(tags) && tags.length > 0 ? (
            <TagContainer>
              {tags.map((tag) => (
                <TagItem
                  type="button"
                  key={tag.id}
                  onClick={() => addTag(tag.name)}
                  $isSelected={selectedTags.includes(tag.name)}
                >
                  {tag.name}
                </TagItem>
              ))}
            </TagContainer>
          ) : (
            <Notag>
              <TagImage src={tagImage} alt="tagImage" />
              <div>나만의 태그를</div>
              <div>직접 만들어보세요!</div>
            </Notag>
          )}
        </div>
      )}
    </div>
  );
}

export default SelectTag;

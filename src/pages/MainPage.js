import AddTagModal from 'components/AddContent/Modal/AddTagModal';
import React, { useRef } from 'react';

function MainPage() {
  const TagRef = useRef(null);

  const showTagModal = () => {
    TagRef.current?.showModal();
  };

  return (
    <div>
      <button type="button" onClick={() => showTagModal()}>
        모달 열기
      </button>
      <AddTagModal
        ref={TagRef}
        onConfirm={(tags) => console.log('선택된 태그:', tags)}
      />
    </div>
  );
}

export default MainPage;

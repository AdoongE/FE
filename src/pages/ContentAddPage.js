import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import InitialContentAdd from '../components/InitialContentAdd';
import AddContent from '../components/AddContent';

function ContentAddPage() {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleContentSelect = (type) => {
    setSelectedContent(type);
  };

  return (
    <div>
      <Navbar />
      <InitialContentAdd onContentSelect={handleContentSelect} />
      {/* 6번째 줄 에러 안 나려고 넣어놓음.. */}
      {selectedContent === 'link'}
      <AddContent />
    </div>
  );
}

export default ContentAddPage;

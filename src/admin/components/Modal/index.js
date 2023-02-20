import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './modal_form.scss';
const App = ({ title, icon, label, content, showFooter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div type='primary' onClick={showModal}>
        {icon}
        <span style={{ marginLeft: '8px' }}>{label}</span>
      </div>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className='modal__content'
        footer={showFooter}
      >
        {content}
      </Modal>
    </>
  );
};
export default App;

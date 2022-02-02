import React from 'react';

import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';

const PendingTaskModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header={`Adding Tasks to - ${props.category.name}`}
      footer={<Button onClick={props.onClear}>Close</Button>}
      show={true}
    >
      shared tasks ----- sms tasks ------ email task
    </Modal>
  );
};

export default PendingTaskModal;

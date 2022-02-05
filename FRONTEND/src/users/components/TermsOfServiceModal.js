import React from 'react';

import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';

const TermsOfServiceModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Terms Of Service"
      footer={<Button onClick={props.onClear}>Close</Button>}
      show={true}
    >
      <p>By using 2DoTrack and/or any of its entities or services you agree to the following. <br/>
      ------------------------------------------------------------------------------------------------------------------------<br/>
      -2DoTrack,its subsidiaries, employees, and management are not liable for any leaked information or 
        damage caused from or by it. 2DoTrack is not a secure app and all the information is available to 
        all of its staff, everyone with an internet connection, and its server hosting partners. This includes passwords,
        financial, and tasks. Please do not enter any information that you are not willing to have publicly available <br/>
      -2DoTrack,its subsidiaries, employees and management maintain the right to cancel your service at anytime without notice, 
       this includes but is not limited to deletion, sharing, or releasing all information stored
       -</p>
    </Modal>
  );
};

export default TermsOfServiceModal;

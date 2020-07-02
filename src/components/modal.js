import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PopUp = (props) => {
    const {
        buttonLabel,
        className,
        isVisible,
        title,
        actionPopUp,
        content,
        singleButton
    } = props;


    return (
        <div>
            <Modal isOpen={isVisible} toggle={() => props.closePopUp(false)} className={className}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    {content}
                </ModalBody>
                <ModalFooter>
                    {singleButton ? <Button color="danger" onClick={actionPopUp}> Delete</Button> : null}
                    <Button color="secondary" onClick={() => props.closePopUp(false)}>{singleButton ? 'Cancel' : 'Close'}</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default PopUp;
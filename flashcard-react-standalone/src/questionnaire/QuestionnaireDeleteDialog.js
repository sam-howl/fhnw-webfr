import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Col } from 'reactstrap'

const QuestionnaireDeleteDialog = props => {
    
    let [showModal, setShowModal] = useState(false)

    const close = () => setShowModal(false)

    const open = () => setShowModal(true)

    const deleteQuestionnaire = () => {
        props.delete(props.id)
        close()
    }

    return (
        <div>
            <Button color="danger" onClick={ open }
                className="float-right">Delete</Button>
            <Modal isOpen={ showModal } toggle={ close } size="lg" autoFocus={false}>
                <ModalHeader toggle={ close } >
                    Delete Questionnaire
                </ModalHeader>
                <ModalBody>
                    <div>Do you really want to delete this questionnaire??</div>
                    <Col className="clearfix" style={{ padding: '.2rem' }}>
                        <Button className="float-right" color="danger" onClick={deleteQuestionnaire}>Delete</Button>
                        <Button className="float-right" color="secondary" onClick={close}>Close</Button>
                    </Col>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default QuestionnaireDeleteDialog

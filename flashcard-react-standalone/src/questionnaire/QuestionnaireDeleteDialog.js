import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Col } from 'reactstrap'

const QuestionnaireDeleteDialog = props => {
    
    let [showModal, setShowModal] = useState(false)

    const close = () => setShowModal(false)

    const open = () => setShowModal(true)

    const deleteQuestionnaire = () => {
        props.delete(props.questionnaire)
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
                    <Form>
                        <FormGroup row>
                            <Label for="formTitle">
                                Do you really want to delete this questionnaire??
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Col className="clearfix" style={{ padding: '.2rem' }}>
                                <Button className="float-right" color="danger"
                                    onClick={deleteQuestionnaire}>Delete</Button>
                                <Button className="float-right" color="secondary"
                                    onClick={close}>Close</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default QuestionnaireDeleteDialog

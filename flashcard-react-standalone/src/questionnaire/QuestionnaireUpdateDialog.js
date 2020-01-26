import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Col, Input } from 'reactstrap'

const QuestionnaireUpdateDialog = props => {

    let [showModal, setShowModal] = useState(false)
    let [questionnaire, setQuestionnaire] = useState(props.questionnaire)

    const change = event =>
        setQuestionnaire({ ...questionnaire, [event.target.name]: event.target.value })

        
    const close = () => {
        setQuestionnaire(props.questionnaire)
        setShowModal(false)
    }

    const open = () => setShowModal(true)

    const update = () => {
        setShowModal(false)
        props.update(questionnaire)
    }

    return (
        <div>
            <Button color="primary" onClick={open}
                className="float-right">Update</Button>
            <Modal isOpen={showModal} toggle={close} size="lg" autoFocus={false}>
                <ModalHeader toggle={close} >
                    Update Questionnaire
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label md={2} for="formTitle">
                                Title
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="text"
                                    id="formTitle"
                                    name='title'
                                    value={questionnaire.title}
                                    onChange={change}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label md={2} for="formDescription">
                                Description
                            </Label>
                            <Col md={10}>
                                <Input
                                    type="text"
                                    id="formDescription"
                                    name='description'
                                    value={questionnaire.description}
                                    onChange={change}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col className="clearfix" style={{ padding: '.2rem' }}>
                                <Button className="float-right" color="primary"
                                    onClick={update}>Update</Button>
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

export default QuestionnaireUpdateDialog

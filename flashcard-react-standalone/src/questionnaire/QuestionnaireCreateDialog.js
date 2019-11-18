import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Col, Input } from 'reactstrap'

const QuestionnaireCreateDialog = props => {

    let [showModal, setShowModal] = useState(false)
    let [questionnaire, setQuestionnaire] = useState({})

    const change = event =>
        setQuestionnaire({ ...questionnaire, [event.target.name]: event.target.value })

    const close = () => setShowModal(false)

    const open = () => setShowModal(true)

    const create = () => {
        props.create(questionnaire)
        close()
    }

    return (
        <div>
            <Button color="success" onClick={open}
                className="float-right">Add Questionnaire</Button>
            <Modal isOpen={showModal} toggle={close} size="lg" autoFocus={false}>
                <ModalHeader toggle={close} >
                    Show Questionnaire
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
                                    onClick={create}>Create</Button>
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

export default QuestionnaireCreateDialog

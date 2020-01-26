import React from 'react';
import QuestionnaireTableElement from './QuestionnaireTableElement';
import { Table } from 'react-bootstrap';

const QuestionnaireTable = props => (

    <Table striped bordered hover >
        <thead>
            <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Description</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {props.questionnaires.map((questionnaire) =>
                <QuestionnaireTableElement
                    key={questionnaire.id}
                    questionnaire={questionnaire} 
                    update={props.update}
                    deleteQuestionnaire = {props.deleteQuestionnaire}
                />
            )}
        </tbody>

    </Table>

)

export default QuestionnaireTable;
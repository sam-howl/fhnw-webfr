import React from 'react';
import QuestionnaireTableElement from './QuestionnaireTableElement';
import { Table } from 'react-bootstrap';

const QestionnaireTable = ({ questionnaires }) => (

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
            {questionnaires.map((questionnaire) =>
                <QuestionnaireTableElement
                    key={questionnaire.id}
                    questionnaire={questionnaire} 
                />
            )}
        </tbody>

    </Table>

)

export default QestionnaireTable;
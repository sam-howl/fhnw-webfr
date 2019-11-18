import React from 'react';
import QuestionnaireShowDialog from './QuestionnaireShowDialog'

const QuestionnaireTableElement = ({questionnaire}) => (
        <tr>
            <td>{questionnaire.id}</td>
            <td>{questionnaire.title}</td>
            <td>{questionnaire.description}</td>
            <div class="btn-group float-right" role="group">
                <QuestionnaireShowDialog questionnaire={questionnaire} />
            </div>
        </tr>
)

export default QuestionnaireTableElement
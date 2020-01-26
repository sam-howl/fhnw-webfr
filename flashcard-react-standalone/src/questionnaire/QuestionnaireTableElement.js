import React from 'react';
import QuestionnaireShowDialog from './QuestionnaireShowDialog'
import QuestionnaireUpdateDialog from './QuestionnaireUpdateDialog'

const QuestionnaireTableElement = props => (
        <tr>
            <td>{props.questionnaire.id}</td>
            <td>{props.questionnaire.title}</td>
            <td>{props.questionnaire.description}</td>
            <div class="btn-group float-right" role="group">
                <QuestionnaireShowDialog questionnaire={props.questionnaire} />
                <QuestionnaireUpdateDialog questionnaire={props.questionnaire} update={props.update} />
            </div>
        </tr>
)

export default QuestionnaireTableElement
import React from 'react';
import QuestionnaireShowDialog from './QuestionnaireShowDialog'
import QuestionnaireUpdateDialog from './QuestionnaireUpdateDialog'
import QuestionnaireDeleteDialog from './QuestionnaireDeleteDialog'

const QuestionnaireTableElement = props => (
        <tr>
            <td>{props.questionnaire.id}</td>
            <td>{props.questionnaire.title}</td>
            <td>{props.questionnaire.description}</td>
            <div class="btn-group float-right" role="group">
                <QuestionnaireShowDialog questionnaire={props.questionnaire} />
                <QuestionnaireUpdateDialog questionnaire={props.questionnaire} update={props.update} />
                <QuestionnaireDeleteDialog id={props.questionnaire.id} delete={props.deleteQuestionnaire} />
            </div>
        </tr>
)

export default QuestionnaireTableElement
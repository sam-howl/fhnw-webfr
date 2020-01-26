import React, { useState } from 'react'
import _ from 'lodash'
import QuestionnaireTable from './QuestionnaireTable';
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog'

const ID = 'id'
const DEFAULT_ID = 0

const QuestionnaireContainer = props => {
    let [questionnaires, setQuestionnaires] = useState(props.qs)

    const id = qs =>
        _.get(_.maxBy(qs, ID), ID, DEFAULT_ID) + 1
    
    const createQuestionnaire = questionnaire =>
        setQuestionnaires(_.concat(questionnaires, { id: id(questionnaires), ...questionnaire}))
    
    const updateQuestionnaire = questionnaire =>
        setQuestionnaires(_.map(questionnaires, q => q.id === questionnaire.id ? questionnaire : q))
    
    const deleteQuestionnaire = id =>
        setQuestionnaires( _.reject(questionnaires, { id: id }))
    
    return (
        <div>
            <h1>Questionnaires</h1>
            <div class="float-right" role="group">
                <QuestionnaireCreateDialog create={ createQuestionnaire } />
            </div>
            <QuestionnaireTable questionnaires={questionnaires} update={updateQuestionnaire} deleteQuestionnaire={deleteQuestionnaire} />
        </div>
    )
}

QuestionnaireContainer.defaultProps = {
    qs: [
        { 'id': 1, 'title': 'Test Title 1', 'description': 'Test Description 1' },
        { 'id': 2, 'title': 'Test Title 2', 'description': 'Test Description 2' },
        { 'id': 3, 'title': 'Test Title 3', 'description': 'Test Description 3' },
        { 'id': 4, 'title': 'Test Title 4', 'description': 'Test Description 4' },
        { 'id': 5, 'title': 'Test Title 5', 'description': 'Test Description 5' }
    ]
}

export default QuestionnaireContainer;
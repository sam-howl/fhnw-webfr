import React, { useEffect } from 'react'
import _ from 'lodash'
import QuestionnaireTable from './QuestionnaireTable';
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog'
import Message from '../misc/Message'
import Loader from '../misc/Loader'
import doFetch from '../network/NetworkUtil'
import { useSelector, useDispatch } from 'react-redux';

const headers = { headers: { 'Content-Type': 'application/json; charset=utf-8' } }

const QuestionnaireContainer = props => {
    const questionnaires = useSelector(state => state.questionnaires, _.isEqual)
    const loading = useSelector(state => state.loading, _.isEqual)
    const message = useSelector(state => state.message, _.isEqual)
    const error = useSelector(state => state.error, _.isEqual)

    const dispatch = useDispatch()

    const readAll = () => {
        dispatch(
            doFetch({
              url: props.server + "/questionnaires",
              actionType: 'READ_QUESTIONNAIRES',
              errorText: 'Not Found'
            })
        )
    }

    useEffect(readAll, [])

    const createQuestionnaire = async questionnaire => {
        dispatch(
            doFetch({
              url: props.server + "/questionnaires",
              requestObject: {method: 'POST', body: JSON.stringify(questionnaire), ...headers},
              actionType: 'CREATE_QUESTIONNAIRES',
              errorText: 'Creation failed'
            })
        )
    }

    const updateQuestionnaire = async questionnaire => {
        dispatch(
            doFetch({
              url: props.server + "/questionnaires/" + questionnaire.id,
              requestObject: {method: 'PUT', body: JSON.stringify(questionnaire), ...headers},
              actionType: 'UPDATE_QUESTIONNAIRES',
              errorText: 'Update failed'
            })
        )
    }

    const deleteQuestionnaire = async id => {
        dispatch(
            doFetch({
              url: props.server + "/questionnaires/" + id,
              requestObject: {method: 'DELETE'},
              actionType: 'DELETE_QUESTIONNAIRES',
              errorText: 'Deletion failed'
            })
        )
        // Ist nötig, wenn wir die REST Schnittstelle nicht verändern wollen.
        // Besser wäre es, wenn wir das gelöschte Questionnaire zurückgeben
        // und dann im NetworkUtil die ID mittels Action an den Reducer mitgeben.
        readAll()
    }

    const renderMessage = () =>
        error ? <Message message={message} /> : null

    const renderQuestionnaireTable = () =>
        loading ? <Loader /> : <QuestionnaireTable questionnaires={questionnaires} 
            update={updateQuestionnaire} deleteQuestionnaire={deleteQuestionnaire} />
    
    return (
        <div>
            <h1>Questionnaires</h1>
            <div className="float-right" role="group">
                <QuestionnaireCreateDialog create={ createQuestionnaire } />
            </div>
            {renderMessage()}
            {renderQuestionnaireTable()}
        </div>
    )
}

export default QuestionnaireContainer;
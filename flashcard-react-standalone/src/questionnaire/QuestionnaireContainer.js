import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import QuestionnaireTable from './QuestionnaireTable';
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog'

// const ID = 'id'
// const DEFAULT_ID = 0

const QuestionnaireContainer = props => {
    let [questionnaires, setQuestionnaires] = useState([])

    // const id = qs =>
    //     _.get(_.maxBy(qs, ID), ID, DEFAULT_ID) + 1
    
    // const createQuestionnaire = questionnaire =>
    //     setQuestionnaires(_.concat(questionnaires, { id: id(questionnaires), ...questionnaire}))

    const createQuestionnaire = async questionnaire => {
        const request = new Request(props.server, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(questionnaire)
        });
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log('Status code: ' + response.status);
            } else {
                const q = await response.json();
                setQuestionnaires(_.concat(questionnaires, q))
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    // const updateQuestionnaire = questionnaire =>
    //     setQuestionnaires(_.map(questionnaires, q => q.id === questionnaire.id ? questionnaire : q))

    const updateQuestionnaire = async questionnaire => {
        const request = new Request(props.server + "/" + questionnaire.id, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(questionnaire)
        });
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log('Status code: ' + response.status);
            } else {
                const q = await response.json();
                setQuestionnaires(_.map(questionnaires, questionnaire => questionnaire.id === q.id ? q : questionnaire))
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    // const deleteQuestionnaire = id =>
    //     setQuestionnaires( _.reject(questionnaires, { id: id }))

    const deleteQuestionnaire = async id => {
        const request = new Request(props.server + "/" + id, {
            method: 'DELETE'
        });
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log('Status code: ' + response.status);
            } else {
                setQuestionnaires( _.reject(questionnaires, { id: id }))
            }
        } catch (error) {
            console.error(error)
        }
    }

    // useEffect(
    //     () => {
    //         fetch(props.server + "questionnaires")
    //             .then(response => response.json())
    //             .then(json => setQuestionnaires(json))
    //             .catch(error => console.error('Error retrieving questionnaires: ' + error))
    //     },
    //     [props.server]
    // )

    useEffect(() => {
        const readAll = async () => {
            const response = await fetch(props.server)
            const qs = await response.json()
            setQuestionnaires(qs)
        } 
        readAll().catch(error => console.error('Error retrieving questionnaires: ' + error))
    }, [props.server])
    
    return (
        <div>
            <h1>Questionnaires</h1>
            <div className="float-right" role="group">
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
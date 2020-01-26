import React from 'react';
import QuestionnaireTable from './QuestionnaireTable';
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog'

export default class QuestionnaireContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionnaires: this.props.qs
        }
        this.createQuestionnaire = this.createQuestionnaire.bind(this)
        this.updateQuestionnaire = this.updateQuestionnaire.bind(this)
    }

    createQuestionnaire(questionnaire){
        let q = {id: this.state.questionnaires.length+1, ...questionnaire}
        let qs = this.state.questionnaires
        qs.push(q)
        this.setState({
            questionnaires: qs
        })
    }

    updateQuestionnaire(questionnaire){
        let questionnairesCopy = this.state.questionnaires.map(q => q.id === questionnaire.id ? questionnaire : q)
        this.setState({
            questionnaires: questionnairesCopy
        })        
    }
    
    render() {
        return(
        <div>
            <h1>Questionnaires</h1>
            <div class="float-right" role="group">
                <QuestionnaireCreateDialog create={ this.createQuestionnaire } />
            </div>
            <QuestionnaireTable questionnaires={this.state.questionnaires} update={this.updateQuestionnaire} />
        </div>)
    }
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


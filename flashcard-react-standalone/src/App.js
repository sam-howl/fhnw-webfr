import React from 'react';
import './App.css';
import Header from './app/Header';
import Footer from './app/Footer';
import QuestionnaireContainer from './questionnaire/QuestionnaireContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        questionnaires: this.props.qs
    }
}

  render() {
    return (
      <div className="App">
        <Header
          title="Flashcard Client with React"
          subtitle="Version 1"
        />
        <QuestionnaireContainer qs={this.state.questionnaires} />
        <Footer message="The FHNW Team" qs={this.state.questionnaires.length} />
      </div>
    );
  }
}

App.defaultProps = {
  qs: [
      { 'id': 1, 'title': 'Test Title 1', 'description': 'Test Description 1' },
      { 'id': 2, 'title': 'Test Title 2', 'description': 'Test Description 2' },
      { 'id': 3, 'title': 'Test Title 3', 'description': 'Test Description 3' },
      { 'id': 4, 'title': 'Test Title 4', 'description': 'Test Description 4' },
      { 'id': 5, 'title': 'Test Title 5', 'description': 'Test Description 5' }
  ]
}


export default App;
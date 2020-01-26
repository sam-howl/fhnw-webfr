import React from 'react';
import './App.css';
import Header from './app/Header';
import Footer from './app/Footer';
import QuestionnaireContainer from './questionnaire/QuestionnaireContainer';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header
          title="Flashcard Client with React"
          subtitle="Version 1"
        />
        <QuestionnaireContainer />
        <Footer message="The FHNW Team" />
      </div>
    );
  }
}


export default App;
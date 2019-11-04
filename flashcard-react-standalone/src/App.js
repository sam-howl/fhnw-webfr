import React from 'react';
import './App.css';
import Header from './app/Header';
import Footer from './app/Footer';
import QuestionnaireController from './questionnaire/QuestionnaireContainer';

// function App() {
//   return (
//     <div>
//     <Header title="Flashcard Client with React" subtitle="Version 1.0" />
//     <QuestionnaireController />
//     <Footer message="The FHNW Team" />
//     </div>
//   );
// }

//sollte auch funktional gemacht sein
const App = () => (
  <div>
    <Header title="Flashcard Client with React" subtitle="Version 1.0" />
    <QuestionnaireController />
    <Footer message="The FHNW Team" />
    </div>
) 

export default App;

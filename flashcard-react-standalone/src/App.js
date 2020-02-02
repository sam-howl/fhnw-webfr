import React, { useEffect } from "react";
import "./App.css";
import Header from "./app/Header";
import Footer from "./app/Footer";
import QuestionnaireContainer from "./questionnaire/QuestionnaireContainer";
import Message from './misc/Message'
import doFetch from './network/NetworkUtil'
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash'

const App = () => {
  const isError = useSelector(state => state.error, _.isEqual)
  const config = useSelector(state => state.config, _.isEqual)
  const message = useSelector(state => state.message, _.isEqual)

  const dispatch = useDispatch()

  const readConfig = () => {
    dispatch(
      doFetch({
        url: 'application.json',
        actionType: 'CONFIG'
      })
    )
  }

  useEffect(readConfig, [])

  const renderMessage = () =>
    isError ? <Message message={message} /> : null

  const renderQuestionnaireContainer = () =>
    config ? <QuestionnaireContainer server={config.SERVER_URL} /> : null

  return (
    <div className="App">
      <Header title="Flashcard Client with React" subtitle="Version 1" />
      {renderMessage()}
      {renderQuestionnaireContainer()}
      <Footer message="The FHNW Team" />
    </div>
  );
};

export default App;

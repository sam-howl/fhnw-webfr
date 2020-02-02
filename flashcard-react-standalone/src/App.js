import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./app/Header";
import Footer from "./app/Footer";
import QuestionnaireContainer from "./questionnaire/QuestionnaireContainer";
import Loader from './misc/Loader'
import Message from './misc/Message'

const defaultServerUrl = "http://localhost:7000/flashcard-express/";

const App = () => {
  const [isError, setIsError] = useState(false);
  const [serverUrl, setServerUrl] = useState(null);

  useEffect(() => {
    fetch("application.json")
      .then(response => response.json)
      .then(json => {
        const SERVER_URL = json.SERVER_URL ? json.SERVER_URL : defaultServerUrl;
        console.log("serverUrl is %s", SERVER_URL);
        setServerUrl(SERVER_URL + "/questionnaires");
      })
      .catch(error => {
        console.error("App error: " + error);
        setIsError(true);
      });
  }, []);

  let comp
  if (serverUrl === null){
    comp = <Loader />
  } else {
    if (isError) {
      comp = <Message message="Network error" />
    } else {
      comp = <QuestionnaireContainer server={serverUrl} />
    }
  }

  return (
    <div className="App">
      <Header title="Flashcard Client with React" subtitle="Version 1" />
      {comp}
      <Footer message="The FHNW Team" />
    </div>
  );
};

export default App;

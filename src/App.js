import React from "react";
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import FileHandling from "./Page/FileHandling";
import ResultPresent from "./Page/ResultPresent";

function App() {
  return (
    <div>
      <Router>
        <FileHandling path="/" />
        <ResultPresent path="/result" />
      </Router>
    </div>
  );
}

export default App;

//    <Row className="d-flex  justify-content-center mx-auto text-center parent">

//</Row>

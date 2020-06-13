import React from "react";
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import FileHandling from "./Page/FileHandling";
import ResultPresent from "./Page/ResultPresent";
import Detail from "./Page/Detail";

function App() {
  return (
    <div>
      <Router>
        <FileHandling path="/" />
        <ResultPresent path="/result" />
        <Detail path="/detail" />
      </Router>
    </div>
  );
}

export default App;

//    <Row className="d-flex  justify-content-center mx-auto text-center parent">

//</Row>

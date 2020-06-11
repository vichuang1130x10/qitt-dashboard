import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { navigate } from "@reach/router";

export default function Landing() {
  return (
    <Jumbotron className="text-center mx-auto">
      <h1 className="display-4">USI Quality Improvement Tracking Table</h1>
      {/* <p className="lead">
        This is a simple web-app to compare 2 excel files which are ME new
        component list and BOM.
      </p> */}
      <hr />
      <p>
        <Button variant="primary" onClick={(e) => navigate(`/file-handle`)}>
          Start To Use
        </Button>
      </p>
    </Jumbotron>
  );
}

// //    <div class="jumbotron text-center">
//       <h1 class="display-4">Welcome To My Website!</h1>
//       <p class="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum necessitatibus perspiciatis cum vitae, modi hic?</p>
//       <hr>
//       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quibusdam.</p>
//       <a class="btn btn-primary btn-lg" href="#" role="button">Read More</a>
//     </div>

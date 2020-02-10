import React from "react";

import { Container } from "reactstrap";

import Carrusel from "./Componentes/Carrusel";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Carrusel />
        </Container>
      </React.Fragment>
    );
  }
}

export default Index;

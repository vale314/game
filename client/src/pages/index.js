import React, { Fragment } from "react";

import { Container, Row, Col } from "reactstrap";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1> Hello Wolrd</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Index;

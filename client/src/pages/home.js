import React from "react";
import { connect } from "react-redux";
import { loadUser } from "../actions/authActions";
import { startSession } from "../actions/chatActions";

import io from "socket.io-client";

// reactstrap components
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";

const socket = io("http://localhost:5000");

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    //this.props.loadUser();
    this.props.startSession(socket.id);
    // eslint-disable-next-line
  }

  componentDidMount() {
    socket.emit("active", {
      token: localStorage.getItem("tokenUser"),
      room: "home"
    });
  }

  componentWillUnmount() {
    socket.emit("exit", {
      room: "home"
    });
    socket.close();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12" className="ml-auto mr-auto mt-5">
              <Card>
                <CardBody className="text-center py-5">
                  <h1>Ingresa Tu Codigo</h1>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="ml-auto mr-auto mt-5">
              <Card>
                <CardBody className="text-center py-5">
                  <Form action="/" className="form-horizontal" method="get">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Input type="text" />
                          <span className="form-text">
                            El Siguiete Campo No Lo Dejes En Blanco, Ingresa Tu
                            Codigo Nuevo Codigo O Previo De Tu Compañero
                          </span>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Col md="12">
                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Vamos
                      </Button>
                    </Col>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default connect(null, { loadUser, startSession })(Home);

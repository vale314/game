import React from "react";
import ReactTable from "react-table-6";
import { Launcher } from "react-chat-window";

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

    this.state = {
      users: [],
      messageList: []
    };
  }
  componentWillMount() {
    //this.props.loadUser();
    // eslint-disable-next-line
  }

  componentDidMount() {
    this.props.startSession(socket.id);

    socket.on("active", payload => {
      this.setState({
        users: payload
      });
    });

    socket.on("msg-room", payload => {
      this.setState({
        messageList: [...this.state.messageList, payload.body]
      });
    });

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

  _onMessageWasSent(message) {
    socket.emit("msg-room", {
      room: "home",
      text: message,
      token: localStorage.getItem("token")
    });
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
                          <span style={{ color: "grey" }} className="form-text">
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
            <Col md="12">
              <CardBody>
                <ReactTable
                  data={this.state.users}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "Name",
                      accessor: "name"
                    },
                    {
                      Header: "Invitar A Jugar",
                      Cell: row => (
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                        >
                          Vamos
                        </Button>
                      )
                    }
                  ]}
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Col>
          </Row>
          <Launcher
            agentProfile={{
              teamName: "react-chat-window",
              imageUrl:
                "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
            }}
            onMessageWasSent={this._onMessageWasSent.bind(this)}
            messageList={this.state.messageList}
            showEmoji
          />
        </div>
      </>
    );
  }
}
export default connect(null, { loadUser, startSession })(Home);

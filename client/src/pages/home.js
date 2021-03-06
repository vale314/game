import React from "react";
import ReactTable from "react-table-6";
import { Launcher } from "react-chat-window";

import { connect } from "react-redux";
import { loadUser, clearErrors } from "../actions/authActions";
import { startSession, updateIdRoom } from "../actions/chatActions";
import { setAlert } from "../actions/alertActions";
import { withRouter } from "react-router-dom";

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
  Button,
  CardTitle
} from "reactstrap";

var socket = io("http://localhost:5000");

class Home extends React.Component {
  _isMounted = true;
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messageList: [],
      room: "",
      user: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadUser();
    // eslint-disable-next-line

    socket = io("http://localhost:5000");

    if (this._isMounted) {
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      socket.on("active", payload => {
        console.log("will", payload);
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
    if (nextProps.user != null) {
      this.setState({
        user: nextProps.user
      });
    }
  }

  componentWillUnmount() {
    console.log("desconectado");
    socket.emit("exit", {
      room: "home"
    });
    socket.close();
    this._isMounted = false;
  }

  _onMessageWasSent(message) {
    const { name } = this.props.user;
    message.data.text = name + ": " + message.data.text;
    socket.emit("msg-room", {
      room: "home",
      text: message,
      token: localStorage.getItem("token")
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { room } = this.state;
    if (room === "" || room === undefined || room === null) {
      this.props.setAlert("Please fill in all fields", "danger");
    } else {
      this.props.updateIdRoom(room);
      socket.emit("login-room", room);

      this.props.history.push({ pathname: "/user/multiplayer" });
    }
  }

  onChange(e) {
    this.setState({
      ...this.state,
      room: e.target.value
    });
  }

  render() {
    const { room } = this.state;

    var name = "";
    var money = "";
    if (this.state.user != null) {
      name = this.state.user.name;
      money = this.state.user.money;
    }
    return (
      <>
        <div className="content">
          <Row md="12" className="ml-auto mr-auto mt-5">
            <Col md="6" className="ml-auto mr-auto mt-5">
              <Row md="6" className="ml-auto mr-auto mt-1">
                <Card>
                  <CardBody className="text-center">
                    <CardTitle tag="h1">Bienvenido </CardTitle>
                    <span>{name}</span>

                    <CardTitle tag="h3">Tu Saldo Es: {money}</CardTitle>
                    <Button
                      color="warning"
                      onClick={e => {
                        e.preventDefault();
                        this.props.history.push("/user/single");
                      }}
                    >
                      Single Player
                    </Button>
                    <br />
                    <Button
                      color="warning"
                      onClick={e => {
                        e.preventDefault();
                        this.props.history.push("/user/multiplayer");
                      }}
                    >
                      Multiplayer Player
                    </Button>
                  </CardBody>
                </Card>
              </Row>
              <Row md="12" className="ml-auto mr-auto mt-5">
                <Card>
                  <CardBody className="text-center py-5">
                    <h1>Ingresa Tu Codigo</h1>
                  </CardBody>
                </Card>
              </Row>
              <Row md="12" className="ml-auto mr-auto mt-5">
                <Card>
                  <CardBody className="text-center py-5">
                    <Form className="form-horizontal" onSubmit={this.onSubmit}>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <Input
                              type="text"
                              name="room"
                              value={room}
                              onChange={this.onChange}
                            />
                            <span
                              style={{ color: "grey" }}
                              className="form-text"
                            >
                              El Siguiete Campo No Lo Dejes En Blanco, Ingresa
                              Tu Codigo Nuevo Codigo O Previo De Tu Compañero
                            </span>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Col md="12">
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={this.onSubmit}
                        >
                          Retar
                        </Button>
                      </Col>
                    </Form>
                  </CardBody>
                </Card>
              </Row>
            </Col>
            <Col md="6">
              <CardBody>
                {this.state.users.length}
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
              teamName: "Casino Global Sala",
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

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  user: store.auth.user
});

export default connect(mapStateToProps, {
  loadUser,
  startSession,
  updateIdRoom,
  setAlert,
  clearErrors
})(withRouter(Home));

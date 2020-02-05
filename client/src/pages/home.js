import React from "react";
import ReactTable from "react-table-6";
import { Launcher } from "react-chat-window";

import { connect } from "react-redux";
import { loadUser, clearErrors } from "../actions/authActions";
import { startSession, updateIdRoom } from "../actions/chatActions";
import { setAlert } from "../actions/alertActions";

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

var socket = io("http://localhost:5000");

class Home extends React.Component {
  _isMounted = true;
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messageList: [],
      room: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.props.loadUser();
    // eslint-disable-next-line
  }

  componentDidMount() {
    socket = io("http://localhost:5000");
    if (this._isMounted) {
      socket.on("active", payload => {
        console.log(payload);
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
        console.log(payload);
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

      this.props.history.push({ pathname: "/user/game" });
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
                        onClick={this.onSubmit}
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

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  loadUser,
  startSession,
  updateIdRoom,
  setAlert,
  clearErrors
})(Home);

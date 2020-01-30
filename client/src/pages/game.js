import React from "react";
import { Launcher } from "react-chat-window";
import { connect } from "react-redux";

import { loadUser } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";
import { withRouter } from "react-router-dom";
import { CardBody, Col, Row, Card } from "reactstrap";

import io from "socket.io-client";
const socket = io("http://localhost:5000");

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: []
    };
  }

  componentWillMount() {
    this.props.loadUser();
    // eslint-disable-next-line
    socket.emit("login-room", this.props.id_room);
  }

  componentDidMount() {
    const { id_room } = this.props.id_room;

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
      room: id_room
    });
  }

  _onMessageWasSent(message) {
    const { name } = this.props.user;
    message.data.text = name + ": " + message.data.text;
    socket.emit("msg-room", {
      room: this.props.id_room,
      text: message,
      token: localStorage.getItem("token")
    });
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12" className="ml-auto mr-auto mt-5">
            <Card>
              <CardBody className="text-center py-5">
                <h1> Bienvenido Al Juego Del Casino</h1>
                <span>Codigo: </span>
                <h3> {this.props.id_room} </h3>
              </CardBody>
            </Card>
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
    );
  }
}

const mapStateToProps = state => ({
  id_room: state.chat.id_room,
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser, setAlert })(
  withRouter(Game)
);

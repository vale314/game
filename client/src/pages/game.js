import React from "react";
import { Launcher } from "react-chat-window";
import { connect } from "react-redux";

import { loadUser } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";
import { withRouter } from "react-router-dom";
import { CardBody, Col, Row, Card } from "reactstrap";

import highlight_img from "../assets/img/hightlight.png";
import pointer_img from "../assets/img/pointer.png";
import roulette_img_under_highlight from "../assets/img/rou_under_high.png";
import roulette_img_on_highlight from "../assets/img/rou_on_high.png";

import wheel from "../assets/img/wheel.png";

import Roulette from "react-roulette-game";

import io from "socket.io-client";
const socket = io("http://localhost:5000");

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: [],
      inicio: false
    };
    this.onChangeRoultte = this.onChangeRoultte.bind(this);
  }

  componentWillMount() {
    //this.props.loadUser();
    // eslint-disable-next-line
    socket.emit("login-room", this.props.id_room);
    this.setState({
      inicio: true
    });
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

  onChangeRoultte(e) {
    console.log(e);
  }

  onClickRoulette(e) {}

  render() {
    const items = ["Apple", "Banana", "Cherry"];
    const colors = ["#F76156", "#FBD1A2", "#BED558"];

    const prize_arr = [
      "Baseball",
      "Rugby",
      "Tennis",
      "Soccer",
      "Badminton",
      "Basketball"
    ];

    const { inicio } = this.state;

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
        <Row>
          <Col md="4" className="ml-auto mr-auto mt-5">
            <Roulette
              roulette_img_under_highlight={wheel}
              highlight_img={highlight_img}
              pointer_img={pointer_img}
              prize_arr={prize_arr}
              start={() => {
                sleep(5000).then(() => {
                  return inicio;
                });
              }}
              start_callback={e => {
                console.log("inicio de ruleta");
              }}
              on_complete={e => {
                console.log(e);
                sleep(5000).then(() => {
                  this.setState({
                    inicio: false
                  });
                });
              }}
            />
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

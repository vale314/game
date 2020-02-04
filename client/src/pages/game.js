import React from "react";
import { Launcher } from "react-chat-window";
import { connect } from "react-redux";

import { loadUser } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";
import { withRouter } from "react-router-dom";
import { CardBody, Col, Row, Card, FormGroup, Input } from "reactstrap";

import highlight_img from "../assets/img/hightlight.png";
import pointer_img from "../assets/img/pointer.png";

import wheel from "../assets/img/wheel.png";

import Roulette from "react-roulette-game";

import io from "socket.io-client";
const socket = io("http://localhost:5000");

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.time = null;

    this.state = {
      messageList: [],
      inicio: false,
      numero: null,
      count: 0,
      num_apostar: 0
    };
    this.onChangeRoultte = this.onChangeRoultte.bind(this);
    this.contadorTimeout = this.contadorTimeout.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  contadorTimeout() {
    const { count } = this.state;
    this.time = setTimeout(
      function() {
        if (count > 0) {
          this.setState({
            count: this.state.count - 1
          });
        }
      }.bind(this),
      1000
    );
  }
  /*  componentDidUpdate(prevProps, prevState) {
    if (this.state.count > 0) {
      this.contadorTimeout();
    }
  }*/

  componentWillUnmount() {
    clearTimeout(this.time);
  }

  componentWillUpdate(nextProps, nextState) {
    const { count } = this.state;

    if (count == 0) {
      clearTimeout(this.time);
    }
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

    this.contadorTimeout();
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

  onChange(e) {
    const value = e.target.value;

    this.setState({
      num_apostar: value
    });
  }

  onClickRoulette(e) {}

  render() {
    const prize_arr = [
      "0",
      "26 Negro",
      "3 Rojo",
      "35 Negro",
      "12 Rojo",
      "28 Negro",
      "7 Rojo",
      "29 Negro",
      "18 Rojo",
      "22 Negro",
      "9 Rojo",
      "31 Negro",
      "14 Rojo",
      "20 Negro",
      "1 Rojo",
      "33 Negro",
      "16 Rojo",
      "24 Negro",
      "5 Rojo",
      "10 Negro",
      "23 Rojo",
      "8 Negro",
      "30 Rojo",
      "11 Negro",
      "36 Rojo",
      "13 Negro",
      "27 Rojo",
      "6 Negro",
      "34 Rojo",
      "17 Negro",
      "25 Rojo",
      "2 Negro",
      "21 Rojo",
      "4 Negro",
      "19 Rojo",
      "15 Negro",
      "32 Rojo"
    ];

    const { numero, count } = this.state;

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
              start={count === 0 ? true : false}
              start_callback={e => {
                console.log("inicio de ruleta");
              }}
              on_complete={e => {
                this.setState({
                  numero: e
                });
              }}
            />
          </Col>
          <Col md="4" className="ml-auto mr-auto mt-5">
            <h2>Tiempo Restante</h2>
            <span> {count}</span>
            <FormGroup>
              <Input
                name="num_apostar"
                type="number"
                value={this.state.num_apostar}
                onChange={this.onChange}
                required
                disabled={this.state.count === 0 ? "disabled" : ""}
              />
            </FormGroup>
            <h3> Numero Ganador</h3>
            <span> {numero} </span>
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

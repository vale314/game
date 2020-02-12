import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { Launcher } from "react-chat-window";

import Timer from "react-compound-timer";

import { setAlert } from "../actions/alertActions";
import { login, clearErrors, loadUser } from "../actions/authActions";
import setAuthToken from "../utils/setAuthToken";
import io from "socket.io-client";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import highlight_img from "../assets/img/hightlight.png";
import pointer_img from "../assets/img/pointer.png";

import wheel from "../assets/img/wheel.png";

import Roulette from "../layout/Roulette";

var socket = io("http://localhost:5000");

class GameM extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inicio: false,
      numero: null,
      num_apostar: 0,
      cantidad: 0,
      user: null,
      stop: false,
      time: null,
      time2: null,
      messageList: []
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeCantidad = this.onChangeCantidad.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadUser();
    // eslint-disable-next-line

    const { id_room } = this.props;

    if (id_room === "") {
      this.props.history.push({ pathname: "/user/home" });
    }

    socket = io("http://localhost:5000");

    socket.emit("login-room", this.props.id_room);

    socket.on("get-time", payload => {
      this.setState({
        time: payload.getTime - Date.now(),
        time2: payload.getTime
      });
    });

    socket.on("msg-room", payload => {
      this.setState({
        messageList: [...this.state.messageList, payload.body]
      });
    });

    socket.emit("get-time", {
      room: id_room
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user != null) {
      this.setState({
        user: nextProps.user
      });
    }
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

  onSubmit(e) {
    e.preventDefault();
    const { cantidad, time2 } = this.state;
    const { money } = this.state.user;

    if (cantidad > money) {
      return this.props.setAlert(
        "Cantidad Insuficiente Agrega Mas Creditos",
        "danger",
        3000
      );
    }
    if (Date.now() > time2) {
      return this.props.setAlert("Tiempo Agotado", "danger", 3000);
    }

    this.setState({
      inicio: true,
      stop: true
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.numero !== null && nextState.stop === true) {
      const { num_apostar, cantidad } = this.state;
      const { numero } = nextState;
      const { money } = this.state.user;

      const user = this.state.user;
      const name = "money";

      if (numero == num_apostar) {
        user[name] = money + cantidad;
        this.setState({
          user
        });
      } else {
        user[name] = money - cantidad;
        this.setState({
          user
        });
      }
      this.setState({
        stop: false
      });

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      setAuthToken(localStorage.tokenUser);

      axios
        .post("/api/user/update", user, config)

        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  onChange(e) {
    const value = e.target.value;

    this.setState({
      num_apostar: value
    });
  }

  onChangeCantidad(e) {
    const value = e.target.value;

    this.setState({
      cantidad: value
    });
  }

  componentWillUnmount() {
    const { id_room } = this.props;

    console.log("desconectado");
    socket.emit("exit", {
      room: { id_room }
    });

    socket.close();
  }

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

    const { numero, inicio, time } = this.state;
    var money = "";
    if (this.state.user != null) {
      money = this.state.user.money;
    }

    const { id_room } = this.props;

    let timer;
    if (time != null) {
      timer = (
        <Timer
          initialTime={time}
          direction="backward"
          onStop={() => {
            console.log("hello");
          }}
        >
          {() => (
            <React.Fragment>
              <Timer.Seconds /> seconds
            </React.Fragment>
          )}
        </Timer>
      );
    }

    return (
      <div className="content">
        <div className="content">
          <Row>
            <Col md="3" className="ml-auto mr-auto mt-5">
              <Card>
                <CardBody className="pull-right py-1">
                  <h3 tag="h3"> Numero Ganador</h3>
                  <h2> {numero} </h2>
                </CardBody>
              </Card>
            </Col>
            <Col md="3" className="ml-auto mr-auto mt-5">
              <Card>
                <CardBody className="pull-left py-1">
                  <h3 tag="h3"> Dinero</h3>
                  <h2> {money} </h2>
                </CardBody>
              </Card>
            </Col>

            <Col md="3" className="ml-auto mr-auto mt-5">
              {timer}
            </Col>
          </Row>
          <Row>
            <Col md="4" className="ml-auto mr-auto mt-5">
              <Roulette
                roulette_img_under_highlight={wheel}
                highlight_img={highlight_img}
                pointer_img={pointer_img}
                prize_arr={prize_arr}
                start={inicio}
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

            <Col className="ml-auto mr-auto" lg="4" md="4">
              <Form className="form" onSubmit={this.onSubmit}>
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("../assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h1">Dinero Apostar</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Dinero Apostar"
                        type="text"
                        name="cantidad"
                        disabled={inicio === true ? "disabled" : ""}
                        value={this.state.cantidad}
                        onChange={this.onChangeCantidad}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Numero A Apostar"
                        type="number"
                        name="num_apostar"
                        disabled={inicio === true ? "disabled" : ""}
                        value={this.state.num_apostar}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      href="#pablo"
                      onClick={this.onSubmit}
                      size="lg"
                    >
                      Apostar
                    </Button>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link footer-link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          ¿ Nesesitas Ayuda ?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
          <Launcher
            agentProfile={{
              teamName: "Casino Chat Private",
              imageUrl:
                "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
            }}
            onMessageWasSent={this._onMessageWasSent.bind(this)}
            messageList={this.state.messageList}
            showEmoji
          />
        </div>
        <span>Codigo: {id_room}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  id_room: state.chat.id_room
});

export default connect(mapStateToProps, {
  login,
  clearErrors,
  loadUser,
  setAlert
})(withRouter(GameM));

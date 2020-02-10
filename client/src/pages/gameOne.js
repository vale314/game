import React from "react";

import { connect } from "react-redux";
import { setAlert } from "../actions/alertActions";
import { login, clearErrors, loadUser } from "../actions/authActions";

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

class GameOne extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inicio: false,
      numero: null,
      num_apostar: 0,
      cantidad: 0,
      user: null,
      stop: false
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeCantidad = this.onChangeCantidad.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.loadUser();
    // eslint-disable-next-line
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user != null) {
      this.setState({
        user: nextProps.user
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { cantidad } = this.state;
    const { money } = this.state.user;

    if (cantidad > money) {
      return this.props.setAlert(
        "Cantidad Insuficiente Agrega Mas Creditos",
        "danger",
        3000
      );
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

    const { numero, inicio } = this.state;
    var money = "";
    if (this.state.user != null) {
      money = this.state.user.money;
    }

    return (
      <div className="content">
        <div className="content">
          <Row>
            <Col md="6" className="ml-auto mr-auto mt-5">
              <Card>
                <CardBody className="pull-right py-1">
                  <h3 tag="h3"> Numero Ganador</h3>
                  <h2> {numero} </h2>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" className="ml-auto mr-auto mt-5">
              <Card>
                <CardBody className="pull-left py-1">
                  <h3 tag="h3"> Dinero</h3>
                  <h2> {money} </h2>
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
        </div>
        <span>Codigo: </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {
  login,
  clearErrors,
  loadUser,
  setAlert
})(GameOne);

import React from "react";
import { connect } from "react-redux";
import { register, clearErrors, loadUser } from "../actions/authActions";
import { setAlert } from "../actions/alertActions";
import { withRouter } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        phone: "",
        password: "",
        password2: ""
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated } = this.props;

    document.body.classList.toggle("sign-up-page");

    this.props.loadUser();
    if (isAuthenticated) {
      this.props.history.push("/user/home");
    }
  }
  componentWillUnmount() {
    document.body.classList.toggle("sign-up-page");
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/home");
    }
    if (nextProps.error) {
      this.props.setAlert(nextProps.error, "danger", 3000);
      this.props.clearErrors();
    }
  }

  onSubmit = e => {
    const { name, email, phone, password, password2 } = this.state.user;

    e.preventDefault();
    if (name === "" || email === "" || password === "" || phone === "") {
      this.props.setAlert("Porfavor Ingree sus campos", "danger");
    } else if (password !== password2) {
      this.props.setAlert("Las Contraseñas No Coinciden", "danger");
    } else {
      this.props.register(this.state.user);
    }
  };

  onChange(e) {
    const user = this.state.user;
    const name = e.target.name;
    user[name] = e.target.value;

    this.setState({
      user
    });
  }
  render() {
    return (
      <>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto" md="5">
                <div className="info-area info-horizontal mt-5">
                  <div className="icon icon-warning">
                    <i className="tim-icons icon-wifi" />
				  </div>
                  <div className="description">
                    <h3 className="info-title">Casino Online</h3>
                    <p className="description">
                      Disfruta juagando, imagina volverte millonario.
                    </p>
					Eso y más AQUI.
                  </div>
                </div>
				
                <div className="info-area info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-triangle-right-17" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Ruleta</h3>
                    <p className="description">
                      La ruleta es un juego de azar propio de los casinos.
					  Los jugadores realizan sus apuestas sobre la mesa y la bola decide los ganadores.
                    </p>
                  </div>
                </div>
				
                <div className="info-area info-horizontal">
                  <div className="icon icon-info">
                    <i className="tim-icons icon-trophy" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Poker</h3>
                    <p className="description">
                      El poker es un juego de cartas en el que los jugadores, 
					  con todas o parte de sus cartas ocultas, hacen apuestas en base a una puja inicial.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="7">
                <Card className="card-register card-white">
                  <CardHeader>
                    <CardImg
                      alt="..."
                      src={require("../assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h4">Registrate</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form className="form" onSubmit={this.onSubmit} href="#">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Full Name"
                          type="name"
                          name="name"
                          value={this.state.user.name}
                          onChange={this.onChange}
                          required
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          value={this.state.user.email}
                          onChange={this.onChange}
                          required
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Telefono"
                          type="number"
                          name="phone"
                          value={this.state.user.phone}
                          onChange={this.onChange}
                          required
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          value={this.state.user.password}
                          onChange={this.onChange}
                          required
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password2"
                          value={this.state.user.password2}
                          onChange={this.onChange}
                          required
                        />
                      </InputGroup>
                      <FormGroup check className="text-left">
                        <Label check>
                          <Input type="checkbox" />
                          <span className="form-check-sign" />
                          Yo accepto todos los terminos{" "}
                          <a href="/" onClick={e => e.preventDefault()}>
                            Terminos
                          </a>
                          .
                        </Label>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-round"
                      color="primary"
                      onClick={this.onSubmit}
                      href="#"
                      size="lg"
                    >
                      Registrate
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {
  register,
  setAlert,
  clearErrors,
  loadUser
})(withRouter(SignUp));

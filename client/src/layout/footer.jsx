import React, { Fragment } from "react";
import { Container, Button } from "reactstrap";
import musicaCasino from "../assets/musica/musicaCasino.mp3";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: false
    };

    this.clickMuted = this.clickMuted.bind(this);
  }

  clickMuted(e) {
    e.preventDefault();
    console.log("hello");
    this.setState({
      muted: !this.state.muted
    });
  }

  render() {
    const { muted } = this.state;
    console.log();
    return (
      <Fragment>
        <Button
          className="btn d-block"
          style={{
            zIndex: 9999,
            position: "fixed",
            left: "2rem",
            bottom: "2.5rem",
            background: "#b0750e"
          }}
          onClick={e => this.clickMuted(e)}
        >
          <i className="tim-icons icon-triangle-right-17" />
        </Button>
        <audio src={musicaCasino} loop autoPlay muted={muted}></audio>
        <footer
          className={"footer" + (this.props.default ? " footer-default" : "")}
        >
          <Container fluid={this.props.fluid ? true : false}>
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="https://www.creative-tim.com">
                  Terminos del casino(en proseso)
                </a>
              </li>{" "}
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.creative-tim.com/presentation"
                >
                  Soporte(en proseso)
                </a>
              </li>{" "}
              <li className="nav-item">
                <a className="nav-link" href="https://blog.creative-tim.com">
                  Contacto(en proseso)
                </a>
              </li>
            </ul>
            <div className="copyright">
              © {new Date().getFullYear()} Creado Por{" "}
              <i className="tim-icons icon-heart-2" /> by{" "}
              <a href="javascript:void(0)" target="_blank">
                Equipo Trabajo
              </a>{" "}
              Para Web
            </div>
          </Container>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;

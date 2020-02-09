import React from "react";

import {Container} from "reactstrap";
import {Row} from "reactstrap";
import {Col} from "reactstrap";

import Carrusel from './Componentes/Carrusel';

import musicaCasino from './musica/musicaCasino.mp3';

import './estilos/index.css'

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <audio src={musicaCasino} loop autoPlay></audio>
          <Container>
            <Carrusel/>
          </Container>
        </main>
        <footer>
          <p className="piePagina"><i>
            <a href="" className="enlacePiePagina">Terminos del casino(en proseso)</a> | 
            <a href="" className="enlacePiePagina"> Soporte(en proseso)</a> | 
            <a href="" className="enlacePiePagina"> Contacto(en proseso)</a>
          </i></p>
        </footer>
      </React.Fragment> 
    );
  }
}

export default Index;

import React from 'react';
import {useState} from 'react';

import {Carousel} from 'reactstrap';
import {CarouselItem} from 'reactstrap';
import {CarouselControl} from 'reactstrap';
import {CarouselIndicators} from 'reactstrap';
import {CarouselCaption} from 'reactstrap';

import fondoInicio from './imagenes/fondoInicio.jpg';
import fondoPokerTexas from './imagenes/fondoPokerTexas.jpg';
import fondoRuleta from './imagenes/fondoRuletaAmericana.jpg';

import './EstilosComponentes/estiloCarrusel.css';

const items = [
  {
    src: fondoInicio,
    altText: 'Mesa de poker',
    titulo: 'Casino Online',
    descripcion: 'Bienvenido al gran mundo de las apuestas, ven y veras la gran suerte que tienes'
  },
  {
    src: fondoPokerTexas,
    altText: 'Poker texas',
    titulo: 'Poker texas(en proceso)',
    descripcion: 'Descripcion no disponible por el momento'
  },
  {
    src: fondoRuleta,
    altText: 'Ruleta americana',
    titulo: 'Ruleta Online',
    descripcion: '!Gira la ruleta y Gana!'
  }
];


function MostrarCarusel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const siguiente = () => {
    if(animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previo = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const irAIndice = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="fondo" src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.descripcion} captionHeader={item.titulo} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={siguiente}
      previous={previo}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={irAIndice} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previo} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={siguiente} />
    </Carousel>
  );
}

export default MostrarCarusel;
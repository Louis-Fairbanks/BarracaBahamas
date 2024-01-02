import React, { useEffect, useRef, useState } from "react";
import cortadora from "../assets/cortadora-honda.jpg"
import pedregullo from '../assets/pedregullo.jpg'
import botellaSpray from '../assets/botellaSpray.jpg'
import tornillo from '../assets/tornillo.jpg'
import nuestroEquipo from '../assets/nuestroEquipo.jpg'
import '../styles/Home.css'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [activeSection, setActiveSection] = useState('section1')
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  //scrolling functionality
  const sectionRefs = {
    section1: useRef(null),
    section2: useRef(null),
    section3: useRef(null)
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust the threshold as needed for visibility detection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    Object.values(sectionRefs).forEach((ref) => {
      observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  const handleUpScroll = () => {
    if (activeSection === 'section2') {
      sectionRefs.section1.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (activeSection === 'section3') {
      sectionRefs.section2.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const handleDownScroll = () => {
    if (activeSection === 'headerSection') {
      sectionRefs.section2.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (activeSection === 'section2') {
      sectionRefs.section3.current.scrollIntoView({ behavior: 'smooth' })
    }
  }


  //carousel settings
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 250,
    autoplaySpeed: 2700,
    cssEase: "linear"
  };

  //handle arrow appearances
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div id='headerSection' ref={sectionRefs.section1}>
        <Header />
      </div>
      <div className="body">
        {(scrollPosition > 500) && <KeyboardArrowUpIcon onClick={handleUpScroll} id="upIcon" />}
        <div id='section1'>
          <div id='doubleColumn' className="row-1 column-1">
            <h1 className="main-header">Los mejores precios.<br />Las mejores marcas.</h1>
            <button className='btn' onClick={() => navigate("/productos")}>Explora productos ahora!</button>
          </div>
          <div id='hideMe' className="row-1 column-2 image-fill" style={{ backgroundImage: `url(${cortadora})` }}
          onClick={() => navigate('/234578930')}>
            <div id='mower'>
            </div>
          </div>
          <div id='brick' className="row-2 column-1" onClick={() => navigate('/678901238')}>
          <div id='ribbon-holder'></div>
            <div>
                Ladrillo de Campo 100 x $20
            </div>
          </div>
          <div id='woods' className="row-2 column-2" 
          onClick={() => navigate('/567890126')}>
            <div>
              Ahorra 10% en Maderas
            </div>
          </div>
          {(scrollPosition < 1475) && <KeyboardArrowDownIcon onClick={handleDownScroll} id="downIcon" />}
          <WhatsAppIcon id="chatIcon" />
        </div>
        <div className="row-element" id='section2' ref={sectionRefs.section2}>
          <div id='secondSlider' >
            <Slider ref={sliderRef} {...settings} className="slider">
              <div className="slide">
                <img src={tornillo} alt="tornillo" onClick={() => navigate('/567234634')}/>
                <h3>Tornillos T1 Punta Mecha x100 $4</h3>
              </div>
              <div className="slide">
                <img src={pedregullo} alt="pedregullo" onClick={() => navigate('/683760394')} />
                <h3>Pedregullo Bolsa 20kg $5</h3>
              </div>
              <div className="slide">
                <img src={botellaSpray} alt="botella spray" onClick={() => navigate('/475928735')}/>
                <h3 className="single-line">Botella Spray 100cc 2 x $5</h3>
              </div>
            </Slider>
          </div>
          <div className="centered-column">
            <h1 className="main-header">Productos Destacados</h1>
            <button className="btn" onClick={() => navigate("/productos")}>Explora nuestras ofertas!</button>
          </div>
        </div>
      </div>
      <div id='section3' ref={sectionRefs.section3}>
        <div className="centered-column">
          <h2>Un Poquito Sobre Nosotros</h2>
          <p>Somos un equipo de tres hermanos comprometido a la provision del mejor
            servicio, seleccion, y precios de todo lo que necesitas.
            Contamos con mas de 25 anos en el rubro, y esperamos seguir sirviendo
            la comunidad y nuestros clientes por mucho mas tiempo.</p>
        </div>
        <img id='nuestroEquipo' src={nuestroEquipo} alt="nuestro equipo" />
      </div>
      <Footer id='home-footer' />
    </>
  );
}
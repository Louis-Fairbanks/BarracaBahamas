import React, { useEffect, useRef, useState } from "react";
import barracaBahamasFavicon from "../assets/barracaBahamasFavicon.svg"
import escalera from "../assets/escalera.jpg"
import cortadora from "../assets/cortadora.jfif"
import llana from "../assets/llana.jfif"
import pintura from "../assets/pintura.jfif"
import pedregullo from '../assets/pedregullo.jpg'
import botellaSpray from '../assets/botellaSpray.jpg'
import tornillo from '../assets/tornillo.jpg'
import nuestroEquipo from '../assets/nuestroEquipo.jpg'
import '../styles/Home.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";


export default function Home() {
    const [items, setItems] = useState(0);
    const [username, setUsername] = useState('Mi Cuenta')
    const [activeSection, setActiveSection] = useState('section1')
    const sliderRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

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
            if(ref.current){
            observer.unobserve(ref.current);}
          });
        };
      }, [sectionRefs]);

      const handleUpScroll = () => {
        if(activeSection === 'section2'){
            sectionRefs.section1.current.scrollIntoView({ behavior: 'smooth'})
        }
        if(activeSection === 'section3'){
            sectionRefs.section2.current.scrollIntoView({ behavior: 'smooth'})
        }
      }
      const handleDownScroll = () =>{
        if(activeSection === 'header'){
            sectionRefs.section2.current.scrollIntoView({ behavior: 'smooth'})
        }
        if(activeSection === 'section2'){
            sectionRefs.section3.current.scrollIntoView({ behavior: 'smooth'})
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
      <div id="header" ref={sectionRefs.section1}>
        <div className="row-element">
          <img src={barracaBahamasFavicon} alt="barraca Bahamas logo" />
          <h1 className="gradient-text">Barraca Bahamas</h1>
        </div>
        <div className="row-element">
        <h2 className="jumping-heading">Contacto</h2>
          <h2 className="jumping-heading">Productos</h2>
          <ShoppingCartIcon id="cartIcon" />
          <button>{items}</button>
          <h2 className="jumping-heading">{username}</h2>
          <AccountCircleIcon id="accountIcon" />
        </div>
      </div>
      <div className="body">
        {(scrollPosition > 500) && <KeyboardArrowUpIcon onClick={handleUpScroll} id="upIcon" />}
        <div  id='section1' className="row-element">
          <div className="centered-column">
            <h1 className="main-header">Los mejores precios de las mejores marcas</h1>
            <button className="btn">Explora productos ahora!</button>
          </div>
          <div>
            <Slider ref={sliderRef} {...settings} className="slider">
              <div className="slide">
                <img src={pintura} alt="pintura" />
                <h3>Pintura Hipercasa 3.6 litros $40</h3>
              </div>
              <div className="slide">
                <img src={cortadora} alt="cortadora" />
                <h3>Cortadora Pasto Honda $800</h3>
              </div>
              <div className="slide">
                <img id="escalera" src={escalera} alt="escalera" />
                <h3 className="single-line">Escalera Plegable Prontometal $50</h3>
              </div>
              <div className="slide">
                <img src={llana} alt="llana" />
                <h3>Llana de Acero Ingco $7</h3>
              </div>
            </Slider>
          </div>
          {(scrollPosition < 1475) && <KeyboardArrowDownIcon onClick={handleDownScroll} id="downIcon" />}
          <WhatsAppIcon id="chatIcon" />
        </div>
        <div className="row-element" id='section2' ref={sectionRefs.section2}>
          <div id='secondSlider' >
            <Slider ref={sliderRef} {...settings} className="slider">
              <div className="slide">
                <img src={tornillo} alt="tornillo" />
                <h3>Tornillos T1 Punta Mecha x100 $4</h3>
              </div>
              <div className="slide">
                <img src={pedregullo} alt="pedregullo" />
                <h3>Pedregullo Bolsa 20kg $5</h3>
              </div>
              <div className="slide">
                <img src={botellaSpray} alt="botella spray" />
                <h3 className="single-line">Botella Spray 100cc 2 x $5</h3>
              </div>
            </Slider>
          </div>
          <div className="centered-column">
            <h1 className="main-header">Productos Destacados</h1>
            <button className="btn">Explora nuestras ofertas!</button>
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
      <Footer/>
    </>
  );
}
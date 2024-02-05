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
  const navigate = useNavigate();

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

  return (
    <>
      <div id='headerSection'>
        <Header />
      </div>
      <div className="body">
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
          <span></span>
            <div id='ladrillo-header'>
                Ladrillo de Campo 100 x $20
            </div>
          </div>
          <div id='woods' className="row-2 column-2" 
          onClick={() => navigate('/567890126')}>
            <div>
              Ahorra 10% en Maderas
            </div>
          </div>
          <WhatsAppIcon id="chatIcon" />
        </div>
        </div>
      <Footer id='home-footer' />
    </>
  );
}
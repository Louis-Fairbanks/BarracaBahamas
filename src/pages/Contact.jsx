import { React, useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import '../styles/Contact.css'

export default function Contact() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const tokyo = { lng: -56.16910561631467, lat: -34.88200117117729 };
    const [zoom] = useState(14);
    maptilersdk.config.apiKey = 'vFA9z0ugcMv6y9rCgh85';

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [tokyo.lng, tokyo.lat],
            zoom: zoom
        });

        new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([-56.16910561631467, -34.88200117117729])
            .addTo(map.current);
    }, [tokyo.lng, tokyo.lat, zoom]);

    return <div id='contactPage'>
        <Header />
        <div id='contactBody'>
            <h1>Nos Encantaría Verte</h1>
            <div className='contact-info'>
            <div className="map-wrap">
                <div ref={mapContainer} className="map" />
            </div>
            <div>
            <h2>Nuestro local se encuentra ubicado en Acevedo Díaz 2395</h2>
            <h4>Lunes a viernes 8:00 - 18:00</h4>
            <h4>Sábados 8:00 - 14:00</h4>
            <p>2999 9999</p>
            <p>099 999 9999</p>
            <p>contacto@barracabahamas.com</p>
            </div>
            </div>
        </div>
        <Footer />
    </div>
}
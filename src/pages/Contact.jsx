import React from 'react'
import Header from '../components/Header'
import { GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api" 
import '../styles/Contact.css'

export default function Contact(){
    const { isLoaded } = useLoadScript({googleMapsApiKey: 'AIzaSyA7fWyEy_x8buaQGmfiMFqopAatW52FVNg'})

    return <>
        <Header/>
        <div id='contact'>
            <h1>Nos encantaria verte</h1>
            <h4>Visita una de nuestros dos locales de lunes
            a viernes de 8 - 18 horas.</h4>
            {isLoaded ? <h4>Cargando...</h4> : <GoogleMap zoom={10} 
            center={{lat: 44, lng: -80}} mapContainerClassName=''/>}
        </div>
    </>
}
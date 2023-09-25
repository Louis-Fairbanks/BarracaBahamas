import React from "react"
import '../styles/Footer.css'
import CopyrightIcon from '@mui/icons-material/Copyright';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


export default function Footer(){
    return <div id="footer">
        <CopyrightIcon/>
        <h5>2023 Barraca Bahamas</h5>
        <FacebookIcon/>
        <InstagramIcon/>
    </div>
}
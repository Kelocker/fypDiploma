import React from 'react'
import '../css/footer.css'
import { KofiButton } from "react-kofi-button";

const Footer = () => {
    const year = new Date().getFullYear();
    


  return (
    <div className="footer-Wrapper">
        <div className="footer-content">

        
            <div className="footer-upper-part">

                <div className="footer-upper-part-left">
                    <ul>
                        <li className="footer-logo">
                            <img src="/SOYA-Python-Logo.png" alt="" />
                            <br />
                            <span className="SOYA-Phrase">How to tame your Python</span>
                        </li>

                        <div className="kofi-button">

                            <li>

                                <KofiButton 
                                username = "kelocker" 
                                label = "Support me on kofi" 
                                
                                backgroundColor = "#000000"
                                />

                            </li>

                        </div>
                       
                    </ul>

                </div>

                <div className="footer-upper-part-center">
                    <ul>
                        <li className="footer-content-title">
                            <span>Explore</span>
                        </li>


                        <div className="footer-content-inside">

                            <li>
                                <a href="https://github.com/Kelocker/fypDiploma/readme.md" target="_blank" rel="noopener noreferrer">Docs</a>
                            </li>

                            <li>

                            </li>

                        </div>
                        
                    </ul>

                </div>

                <div className="footer-upper-part-right">

                    <ul>
                        <li className="footer-content-title">
                            <span>Let's Connect</span>
                        </li>

                        <div className="footer-content-inside">


                            <li>
                                <a href="mailto:thekelvin0fficials@gmail.com">Contact me</a>
                            </li>

                            <li>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdTnVpokY8Tc2_x6J1SEjQzfF-6-cG7qawy-qrVwYpr65JC8g/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">Suggest</a>
                            </li>

                            <li>
                                <a href="https://github.com/Kelocker" target="_blank" rel="noopener noreferrer">Github</a>
                            </li>


                        </div>
                        
                        
                    </ul>

                </div>

            </div>

            <div className="footer-lower-part">
                <div className="footer-copyright-content">

                <span className="footer-copyright-content-bold">Made with 💓 from <a href="https://github.com/Kelocker/fypDiploma" target='_blank' rel="noreferrer">@SOYA</a></span>
                <span>Copyright &copy; {year} All Rights Reserved</span>

                </div>
                
            </div>



        </div>
    </div>
  )
}

export default Footer
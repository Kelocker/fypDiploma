import React from 'react'
import '../css/price.css'

const Price = () => {
  return (
    <div className="Price-conainer">
        <div className="price-title">
            <span className="plan-price-title">Plans & Pricing</span>
            <br />
            <span className="plan-price-subtitle">SOYA is 100% free!</span>

        </div>
        <div className="price-container">
            <div className="price-card">

                <div className="Plan-type">

                    <span className="invisible-font">
                        .
                    </span>

                    <span className="Plan-level">
                        Basic
                    </span>

                    <span>
                        Free
                    </span>

                </div>
                

                <div className="Plan-details">

                    <span className="Plan-feature">
                        
                    <ul>
                        <li>Login</li>
                        <li>Dashboard</li>
                    </ul>
                    
                    </span>
                    

                </div>

                

                

                <div className="Plan-button">

                    <button>Get Started</button>

                </div>
                

            </div>


            <div className="price-card Pro">

                <div className="Plan-type">

                    <span className="most-popular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7db5b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>

                        Most popular
                    </span>

                    <span className="Plan-level">
                        Pro
                    </span>

                    <span>
                        MYR 0.00 / month
                    </span>

                </div>
                

                <div className="Plan-details">

                    <span className="Plan-feature">
                        
                    <ul>
                        <li>Dashboard</li>
                        <li>Learning</li>
                        <li>Excercise</li>
                        <li>Rank</li>
                        <li>Compiler</li>
                    </ul>
                    
                    </span>
                    

                </div>

                

                

                <div className="Plan-button Pro-button">

                    <button>
                        Go to Dashboard
                    </button>

                </div>
                

            </div>

            <div className="price-card">

                <div className="Plan-type">

                    <span className="invisible-font">
                        .
                    </span>

                    <span className="Plan-level">
                        Student
                    </span>

                    <span>
                        MYR 0.00 / month
                    </span>

                </div>
                

                <div className="Plan-details">

                    <span className="Plan-feature">
                        
                    <ul>
                        <li>Dashboard</li>
                        <li>Learning</li>
                        <li>Excercise</li>
                        <li>Rank</li>
                    </ul>
                    
                    </span>
                    

                </div>

                

                

                <div className="Plan-button">

                    <button onClick={() => window.open("https://github.com/Kelocker/fypDiploma/", "_blank", "noopener,noreferrer")}>
                        Learn more
                    </button>

                </div>
                

            
            </div>
        </div>
    </div>
  )
}

export default Price
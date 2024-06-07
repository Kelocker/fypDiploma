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

                    <span>
                        {/* Most popular */}
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

                    <span>
                        {/* Most popular */}
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

                    <span>
                        {/* Most popular */}
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
                        <li>Compiler</li>
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
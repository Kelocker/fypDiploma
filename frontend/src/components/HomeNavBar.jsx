import React, { useEffect, useRef }  from 'react'
import '../css/homeNavbar.css'
import Login from '../components/login'
import About from '../components/About'


const HomeNavBar = () => {

  const aboutRef = useRef(null);
  // const galleryRef = useRef(null);
  // const pricingRef = useRef(null);

  useEffect(() => {
    // Initially hide the sidebar when the component mounts
    closeSideBar();
    closeLoginComponent();
  }, [] ); //dependency array

  function showSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }

  function closeSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }

  function OpenLoginComponent(){
    const LoginComponent = document.querySelector('.LoginComponentNav')
    LoginComponent.style.display = 'block'
  }

  function closeLoginComponent(){
    const LoginComponent = document.querySelector('.LoginComponentNav')
    LoginComponent.style.display = 'none'
  }


  

  

  const scrollToSection = (ref) => {
    // Check the ref is not null (falsy) and the current property is not null (falsy) 
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <>

      <nav className="HomeNavBar">
        
          <ul className="sidebar">
            <li  onClick= {() => closeSideBar()}>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" fill="#055257"/>
                </svg>
              </a>
            </li>
            <li><a href="/">Home</a></li>
            <li onClick={() => scrollToSection(aboutRef)}><a href="#">About</a></li>
            <li><a href="/login">Gallery</a></li>
            <li><a href="/login">Price</a></li>
            <li onClick={() => OpenLoginComponent() }><a href="#">Login</a></li>
            <li><a href="/signup">Signup</a></li>

          </ul>
     
        
        <ul>

            <li><a href="/" className="HomeNavLogo"><img src="/SOYA-Python-Logo.png" alt="" /></a></li>
            <li className="hideOnMobile"><a href="/">Home</a></li>
            <li className="hideOnMobile" onClick={() => scrollToSection(aboutRef)}><a href="#">About</a></li>
            <li className="hideOnMobile"><a href="/login">Gallery</a></li>
            <li className="hideOnMobile"><a href="/login">Price</a></li>
            <li className="hideOnMobile" onClick={() => OpenLoginComponent() }><a href="#">Login</a></li>
            <li className="hideOnMobile"><a href="/signup">Signup</a></li>
            <li className="menu-button" onClick={() => showSideBar() } >
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="30">
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" fill="#055257" />
                </svg>
              </a>
            </li>

            
        </ul>

          
     

      </nav>
    


      <div className="LoginComponentNav">
        <button onClick = {() => closeLoginComponent()} className="LoginComponentCloseButton">
          <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" fill="#055257"/>
          </svg>
        </button>
        <Login />
      </div>

      <div className="ComponentSection">

        {/* Section components */}
                <div ref={aboutRef}><About /></div>
            
        {/* More sections as needed */}

      </div>
      

      </>





  )
}

export default HomeNavBar
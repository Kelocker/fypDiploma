import React, { useEffect, useRef }  from 'react'
import '../css/homeNavbar.css'
import Login from '../components/login'
import Signup from '../screens/signup'
import About from '../components/About'


const HomeNavBar = () => {

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const galleryRef = useRef(null);
  const priceRef = useRef(null);

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
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" fill="#055257"/>
                </svg>
              </button>
            </li>
            <li onClick={() => scrollToSection(homeRef)}><button>Home</button></li>
            <li onClick={() => scrollToSection(aboutRef)}><button>About</button></li>
            <li onClick={() => scrollToSection(galleryRef)}><button>Gallery</button></li>
            <li onClick={() => scrollToSection(priceRef)}><button>Price</button></li>
            <li onClick={() => OpenLoginComponent() }><button>Login</button></li>
            
          </ul>
     
        
        <ul className="normal-bar">

            <li><a href="/" className="HomeNavLogo"><img src="/SOYA-Python-Logo.png" alt="" /></a></li>
            <li className="hideOnMobile"><button onClick={() => scrollToSection(homeRef)}>Home</button></li>
            <li className="hideOnMobile"><button onClick={() => scrollToSection(aboutRef)}>About</button></li>
            <li className="hideOnMobile"><button onClick={() => scrollToSection(galleryRef)}>Gallery</button></li>
            <li className="hideOnMobile"><button onClick={() => scrollToSection(priceRef)}>Price</button></li>
            <li className="hideOnMobile"><button onClick={() => OpenLoginComponent() }>Login</button></li>
            
            <li className="menu-button" onClick={() => showSideBar() } >
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="30">
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" fill="#055257" />
                </svg>
              </button>
            </li>

            
        </ul>

          
     

      </nav>
    


      <div className="LoginComponentNav">
        <button onClick = {() => closeLoginComponent()} className="LoginComponentCloseButton">
          <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" fill="#055257"/>
          </svg>
        </button>
        < Signup />
      </div>

     

      <div className="ComponentSection">

        {/* Section components */}
                <div ref={homeRef}><About /></div>
                <div ref={aboutRef}><About /></div>
            
        {/* More sections as needed */}
                <div ref={galleryRef}><About /></div>

                <div ref={priceRef}><About /></div>
                

      </div>
      

      </>





  )
}

export default HomeNavBar
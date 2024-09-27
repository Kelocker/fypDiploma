# SOYA
![soya.png](frontend/public/soya.png)

- - -

## Table of Contents

1. [Disclaimer](#Disclaimer)
2. [Introduction](#introduction)
3. [About the project](#About-the-project)
4. [Steps to Run the Project](#Steps-to-Run-the-Project)
5. [About Our Team](#About-Our-Team)
6. [Acknowledgements](#Acknowledgements)


- - -


# Disclaimer
This repository is part of a software development project module assignment and is created for educational purposes only. It is a student project from Asia Pacific University (APU) and does not provide any warranty or guarantee, either expressed or implied, regarding the accuracy, completeness, or performance of the software. Use of this software is at your own risk, and the author is not responsible for any issues, damages, or losses that may arise from its use.

# Introduction
<br>
We are students from Asia Pacific University, and this is our Software Development Project titled SOYA. This project is part of our academic coursework and serves to demonstrate the skills and knowledge we have acquired in software development.

# About-the-project
SOYA is a website designed to help users learn and master Python. It provides resources to learn Python, practice through exercises, and even compete with others. This project is developed using Django, a Python web framework, to deliver an interactive learning experience.

A test-script feature is implemented to automatically evaluate and check your answers, ensuring a smooth and efficient learning process.

>   How to tame your python



---

# Steps-to-Run-the-Project

1. **Create Virtual Environment**  
   In the project root, create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. **Activate Virtual Environment**  
   Activate the virtual environment:
   ```bash
   venv\Scripts\activate
   ```

3. **Install Dependencies**  
   Install the required dependencies from the `requirements.txt` file:
   ```bash
   pip install -r requirements.txt
   ```

4. **Restart Terminal**  
   If necessary, restart the terminal after installing dependencies.

5. **Activate Virtual Environment Again (If Needed)**  
   In case the virtual environment isn't active after restarting, activate it using one of the following commands:

   ```bash
   venvat
   ```
   or
   ```bash
   venv\Scripts\activate
   ```

6. **Split Terminal**  
   Open a split terminal to run the frontend and backend servers simultaneously.

7. **Start Frontend**  
   In the first terminal, navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
   Start the frontend development server:
   ```bash
   npm run start
   ```

8. **Start Backend**  
   In the second terminal, navigate to the `backend` directory:
   ```bash
   cd backend
   ```
   Start the Django server:
   ```bash
   python manage.py runserver
   ```

9. **Open the Browser**  
   Once both servers are running, open any browser and navigate to:
   ```
   http://localhost:3000/
   ```
10. **Open the serverside of SOYA**
    open any browser and navigate to:
    ```
    http://127.0.0.1:8000/
    ```
---





<br>

# About-Our-Team


I'm CHONG KELVIN feel free to visit my [GitHub Profile](https://github.com/kelocker), where I host various open-source projects and contributions.

I'm LIM GEN JACK, you're welcome to explore my [GitHub Profile](https://github.com/Jack-1118), where I showcase a collection of open-source projects and notable contributions.

I am HEW YEE KIT. I have helped my team in building this project for our assignment with troubleshooting the codes and fixing any known bugs to make the program to run smoothly without any issues.

I am CHUA HUI WEN. To delve deeper into my portfolio and accomplishments, feel free to explore my [GitHub Profile](https://github.com/CHUA1605).
<br>




---

# Acknowledgements

We would like to express our gratitude to the following open-source projects and libraries, which made significant contributions to the development of this project:

## Backend Libraries

- [**asgiref**](https://pypi.org/project/asgiref/): "Thank you asgiref for enabling asynchronous support in Django with ease."
- [**Django**](https://www.djangoproject.com/): "Grateful to Django for being the powerful backbone of our project."
- [**django-cors-headers**](https://pypi.org/project/django-cors-headers/): "Thank you django-cors-headers for handling cross-origin requests seamlessly."
- [**djangorestframework**](https://www.django-rest-framework.org/): "A big thanks to DRF for simplifying API development in Django."
- [**djangorestframework-simplejwt**](https://pypi.org/project/djangorestframework-simplejwt/): "Appreciate the simplicity and security that djangorestframework-simplejwt brings to our token authentication."
- [**PyJWT**](https://pypi.org/project/PyJWT/): "Thank you PyJWT for making JWT token encoding and decoding a breeze."
- [**pytz**](https://pypi.org/project/pytz/): "Thanks to pytz for making timezone management effortless."
- [**sqlparse**](https://pypi.org/project/sqlparse/): "Grateful to sqlparse for handling SQL queries with precision."
- [**psycopg2-binary**](https://pypi.org/project/psycopg2-binary/): "Thank you psycopg2-binary for smooth PostgreSQL integration in our project."
- [**python-dotenv**](https://pypi.org/project/python-dotenv/): "Thank you python-dotenv for simplifying environment variable management."
- [**dj-rest-auth**](https://dj-rest-auth.readthedocs.io/en/latest/): "Grateful to dj-rest-auth for providing easy-to-use authentication endpoints."
- [**venvat**](https://pypi.org/project/venvat/): "Thank you venvat for making virtual environment activation easier than ever."

## Frontend Libraries

- [**@chakra-ui/react**](https://chakra-ui.com/): "Thanks to Chakra UI for making frontend styling beautiful and simple."
- [**@emotion/react**](https://emotion.sh/docs/@emotion/react): "Thank you @emotion/react for injecting styles into our app with ease."
- [**@emotion/styled**](https://emotion.sh/docs/styled): "Grateful to @emotion/styled for making CSS-in-JS effortless."
- [**@monaco-editor/react**](https://github.com/suren-atoyan/monaco-react): "Thanks to monaco-editor for providing a smooth code editing experience."
- [**@mui/lab**](https://mui.com/material-ui/about-the-lab/): "Thank you @mui/lab for being the experimental playground of UI components."
- [**@mui/material**](https://mui.com/): "Grateful to MUI for crafting elegant material design elements."
- [**@testing-library/jest-dom**](https://testing-library.com/docs/ecosystem-jest-dom): "Thank you jest-dom for making DOM assertions intuitive."
- [**@testing-library/react**](https://testing-library.com/docs/react-testing-library/intro): "Thanks to @testing-library/react for simplifying React component testing."
- [**@testing-library/user-event**](https://testing-library.com/docs/user-event/intro/): "Grateful for user-event's seamless simulation of user interactions."
- [**axios**](https://axios-http.com/): "Thank you axios for making API requests fast and efficient."
- [**framer-motion**](https://www.framer.com/motion/): "Thanks to framer-motion for adding smooth animations to our interface."
- [**ionicons**](https://ionic.io/ionicons): "Grateful to ionicons for providing sleek, modern icons."
- [**jwt-decode**](https://www.npmjs.com/package/jwt-decode): "Thanks to jwt-decode for effortlessly parsing JWT tokens."
- [**monaco-themes**](https://www.npmjs.com/package/monaco-themes): "Thank you monaco-themes for offering a palette of editor themes."
- [**react**](https://react.dev/): "Grateful to React for being the foundation of our dynamic frontend."
- [**react-dom**](https://react.dev/): "Thank you react-dom for rendering our React app efficiently."
- [**react-kofi-button**](https://www.npmjs.com/package/react-kofi-button): "Thanks to react-kofi-button for making donations accessible."
- [**react-router-dom**](https://reactrouter.com/en/main): "Grateful to react-router-dom for smooth and declarative navigation."
- [**react-scripts**](https://www.npmjs.com/package/react-scripts): "Thank you react-scripts for managing our project setup with ease."
- [**react-select**](https://react-select.com/home): "Thanks to react-select for making multi-select interfaces user-friendly."
- [**react-timer-hook**](https://www.npmjs.com/package/react-timer-hook): "Grateful to react-timer-hook for handling timers effortlessly."
- [**react-toastify**](https://fkhadra.github.io/react-toastify/introduction): "Thank you react-toastify for delivering smooth and stylish notifications."
- [**resize-observer-polyfill**](https://www.npmjs.com/package/resize-observer-polyfill): "Thanks to resize-observer-polyfill for observing size changes effortlessly."
- [**swiper**](https://swiperjs.com/): "Grateful to swiper for creating smooth and responsive slideshows."
- [**web-vitals**](https://github.com/GoogleChrome/web-vitals): "Thank you web-vitals for helping us measure real user performance."


## Special Thanks
A special thanks to the [**Test-Script**](https://github.com/exercism/python/tree/main/exercises/practice) from Exercism for providing invaluable practice exercises and resources that helped enhance our Software Development Project.

---

import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useEffect, useState } from 'react';

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);


    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            }else{
                setIsAuthorized(false);
            }

        }catch(error){
            console.log(error);
            setIsAuthorized(false);

        }

    }


    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp 
        const currentTime = Date.now() / 1000;

        if (tokenExpiration < currentTime) {
            await refreshToken();
        }else {
            setIsAuthorized(true);
        
        }

    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    } else if (isAuthorized === false) {
        return <Navigate to="/" />
    } else {
        return children;
    }

    
}

export default ProtectedRoute
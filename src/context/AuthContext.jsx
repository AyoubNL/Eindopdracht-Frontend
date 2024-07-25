import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [fleet, setFleet] = useState([])
    const [list, setList] = useState([{
        brand: 'merk', plate:
            'kenteken', model: 'model', year: 'bouwjaar', audit: 'APK'
    }])

    const fleetFromStorage = JSON.parse(localStorage.getItem('wagenpark') || '[]')

    const [park, setPark] = useState(fleetFromStorage)

    useEffect(() => {
        const token = localStorage.getItem('token')
        localStorage.setItem('wagenpark', JSON.stringify(park))

        if (token) {
            const decoded = jwtDecode(token)

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: decoded.sub,
                },
                status: 'done',
            });
        } else {
            toggleIsAuth({
                isAuth: false,
                user: '',
                status: 'done'
            })
        }
    }, [park]);


    const navigate = useNavigate()

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {
            username: '',
            email: '',
            password: '',
        },
        status: 'pending'
    });

    const login = (JWT) => {
        console.log('Gebruiker is ingelogd!')
        localStorage.setItem('token', JWT)
        const decoded = jwtDecode(JWT)
        console.log(decoded)
        toggleIsAuth({
            ...isAuth,
            isAuth: true,
            user: {
                username: decoded.sub
            },
            status: 'done',
        })
        navigate('/fleet')
    }

    const logout = () => {
        localStorage.clear()
        toggleIsAuth({
            isAuth: false,
            user: '',
            status: 'done'
        })
        console.log('Gebruiker is uitgelogd!')
        navigate('/')
    }

    return (
        <AuthContext.Provider
            value={{isAuth, toggleIsAuth, login, logout, fleet, setFleet, list, setList, park, setPark}}>

            {isAuth.status === 'done' ? children : <p>Loading...</p>}


        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
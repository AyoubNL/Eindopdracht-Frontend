import {createContext, useState} from "react";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {
            username: '',
            email: '',
            password: '',
        },
        status: 'pending'
    });















    return (
        <AuthContext.Provider value={{isAuth, toggleIsAuth}}>

            {children}

        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
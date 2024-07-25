import './styles/global.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Signin from "./pages/signin/Signin.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Fleet from "./pages/fleet/Fleet.jsx";
import Notfound from "./pages/notfound/Notfound.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import Footer from "./components/footer/Footer.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/signin' element={<Signin/>}/>
                <Route path='/fleet' element={isAuth.isAuth ? <Fleet /> : <Navigate to="/signin"/>}/>
                <Route path="*" element={<Notfound/>}/>
            </Routes>
            <Footer/>



        </>
    )
}

export default App

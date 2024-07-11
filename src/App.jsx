import './styles/global.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Signin from "./pages/signin/Signin.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Fleet from "./pages/fleet/Fleet.jsx";
import Notfound from "./pages/notfound/Notfound.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/signin' element={<Signin/>}/>
                <Route path='/fleet' element={<Fleet/>}/>
                <Route path="*" element={<Notfound/>}/>
            </Routes>
        </>
    )
}

export default App

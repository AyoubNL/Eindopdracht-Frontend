import './Navbar.css'
import icon from '../../assets/logo-color.png'
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../button/button.jsx";

function NavBar() {
    const navigate = useNavigate()
    const {isAuth, logout} = useContext(AuthContext)

    return (
        <nav>
            <Link to="/">
          <span className="icon-container">
            <img src={icon} alt="icon"/>
          </span>
            </Link>

            <div>
                {isAuth.isAuth ?
                    <div>
                        <Button type='button' onClick={() => navigate('/sellcheck')}>Verkoopcheck</Button>
                        <Button type='button' onClick={() => navigate('/fleet')}>Wagenpark</Button>
                        <Button type='button' onClick={logout}>Log out</Button>
                    </div>
                    :
                    <div>
                        <Button type='button' onClick={() => navigate('/signin')}>Inloggen</Button>
                        <Button type='button' onClick={() => navigate('/signup')}>Registreren</Button>
                    </div>
                }
            </div>
        </nav>
    );
}

export default NavBar;
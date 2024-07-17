import './Navbar.css'
import icon from '../../assets/logo-color.png'
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function NavBar() {
    const navigate = useNavigate()
    const {isAuth, logout} = useContext(AuthContext)

    return (
        <nav>
            <Link to="/">
          <span className="icon-container">
            <img src={icon} alt="icon"/>
            <h3>
              APKdash
            </h3>
          </span>
            </Link>

            <div>
                {isAuth.isAuth ?

                    <button
                        type="button"
                        onClick={logout}
                    >Log out</button>

                    :
                    <div>
                        <button
                            type="button"
                            onClick={() => navigate('/signin')}
                        >Inloggen
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                        >Registreren
                        </button>
                    </div>
                }
                    </div>
                    </nav>
                    );
                }

export default NavBar;
import './Fleet.css'
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import logo from "../../assets/logo-color.png"
import magnifying_glass from '../../assets/icons/magnifying_glass.png'
import Button from "../../components/button/button.jsx";
import axios from "axios";

function Fleet() {
    const {isAuth} = useContext(AuthContext)
    const [licence, setLicence] = useState('')

    function handleChange(e) {
               setLicence(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${licence.replaceAll('-', '')}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-App-Token': `${import.meta.env.VITE_RDW_KEY}`
                }
            })
            setLicence(response)
            console.log(response.data[0].vervaldatum_apk)
        } catch (e) {
            console.error(e)
        }
    }

    // let boo = licence.replace(/(\d{4})(\d{2})(\d{2})/g, '$3-$2-$1')
    // let dateString = boo.replaceAll('-', '/')
    //
    // console.log(dateString)

    return (<>
            <div className="wrapper-fleet">
                <div className="text-box-fleet">
                    <h1>Welkom {isAuth.user.username}</h1>
                    <h3>Voeg je voertuig toe aan het wagenpark</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="input-fleet">

                        <input type="text" placeholder='KENTEKEN' id='licence' name='licence' maxLength="8"
                               autoComplete="off" required="" onChange={handleChange} value={licence}
                        />
                        <Button onClick={handleSubmit}  className='magnifying-glass'><img src={magnifying_glass} alt=""/></Button>

                    </div>
                    </form>


                </div>
                <img src={logo} alt="afbeelding logo"/>

            </div>
        </>

    );
}

export default Fleet;
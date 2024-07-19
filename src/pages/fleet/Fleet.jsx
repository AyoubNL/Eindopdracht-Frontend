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
    const [fleet, setFleet] = useState([])


    function handleChange(e) {
        setLicence(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${licence.replaceAll('-', '').toUpperCase()}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-App-Token': `${import.meta.env.VITE_RDW_KEY}`
                }
            })
            setFleet(response.data)
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }

    }

    // let boo = licence.replace(/(\d{4})(\d{2})(\d{2})/g, '$3-$2-$1')
    // let dateString = boo.replaceAll('-', '/')
    //
    // console.log(dateString)

    let fleetDetails = ''
    fleetDetails = Object.values(fleet).map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.kenteken}</td>
                <td>{item.merk}</td>
                <td>{item.handelsbenaming}</td>
                <td>{item.datum_eerste_tenaamstelling_in_nederland_dt}</td>
                <td>{item.vervaldatum_apk_dt}</td>
            </tr>
        )
    })

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
                            <Button onClick={handleSubmit} className='magnifying-glass'><img src={magnifying_glass}
                                                                                             alt="afbeelding zoekknop"/></Button>
                        </div>
                    </form>
                </div>
                <img src={logo} alt="afbeelding logo"/>
            </div>
            <div className='table-container'>
            <main className='table'>
                <section className='table-header'>
                    <h2>Wagenpark</h2>
                </section>
                <section className='table-body'>
                    <table>
                        <thead>
                        <tr>
                            <th>Kenteken</th>
                            <th>Merk</th>
                            <th>Model</th>
                            <th>Bouwjaar</th>
                            <th>APK Vervaldatum</th>
                        </tr>
                        </thead>

                        <tbody>
                        {fleetDetails}
                        </tbody>

                    </table>
                </section>

            </main>
            </div>
        </>

    );
}

export default Fleet;
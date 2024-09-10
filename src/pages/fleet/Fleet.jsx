import './Fleet.css'
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import logo from "../../assets/logo-color.png"
import axios from "axios";
import Modal from "../../components/modal/Modal.jsx";
import convertTime from "../../helpers/convertTime.jsx";
import Button from "../../components/button/button.jsx";
import convertLicence from "../../helpers/convertLicence.jsx";
import Input from "../../components/input/Input.jsx";
import {useNavigate} from "react-router-dom";

function Fleet() {
    const [search, setSearch] = useState('')
    const {isAuth, setFleet, setList, park, setPark, licence, setLicence} = useContext(AuthContext)

    const navigate = useNavigate()

    function handleChange(e) {

        setLicence(e.target.value)
    }

    function handleDelete(plate) {
        const newPark = park.filter(park => park.plate !== plate)
        setPark(newPark)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${convertLicence(licence)}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-App-Token': `${import.meta.env.VITE_RDW_KEY}`
                }
            })
            setFleet(response.data)
            setList({
                    plate: response.data[0].kenteken,
                    brand: response.data[0].merk,
                    model: response.data[0].handelsbenaming,
                    year: response.data[0].datum_eerste_tenaamstelling_in_nederland_dt,
                    audit: response.data[0].vervaldatum_apk_dt
                }
            )

        } catch (e) {
            console.error(e)
        }
        return setLicence('')
    }

    let listDetails = ''
    listDetails = Object.values(park).filter((unit) => {
        return search === '' ? unit : unit.plate.includes(search)
    }).map((item, id) => {
            return (
                <tr key={id}>
                    <td>{item.plate}</td>
                    <td>{item.brand}</td>
                    <td>{item.model}</td>
                    <td>{convertTime(item.year)}</td>
                    <td>{convertTime(item.audit)}</td>
                    <td><Button className='sellcheck-button' type='button'
                                onClick={() => {navigate(`/sellcheck/${item.plate}`)}}>Verkoopcheck</Button>
                    </td>
                    <td><Button className='delete-button' type='button'
                                onClick={() => handleDelete(item.plate)}>Verwijder</Button></td>
                </tr>
            )
        }
    )


    return (<>
            <div className="wrapper-fleet">
                <header>
                    <h1>Welkom {isAuth.user.username}</h1>
                    <h3>Voeg je voertuig toe aan het wagenpark</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-fleet">
                            <Input type="text" placeholder='KENTEKEN' id='licence' name='licence' maxLength="8"
                                   autoComplete="off" required="" onChange={handleChange} value={licence}/>
                            <Modal/>
                        </div>
                    </form>
                </header>
                <img src={logo} alt="afbeelding logo"/>
            </div>
            <div className='table-container'>
                <main className='table'>
                    <section className='table-header'>
                        <h2>Wagenpark</h2>
                        <Input className='searchbox' type="text" placeholder='Zoek kenteken...'
                               onChange={(e) => setSearch(e.target.value)}/>
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
                                <th>Verkoopcheck</th>
                                <th>Actie</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listDetails}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </>

    );

}

export default Fleet;

import './Fleet.css'
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import logo from "../../assets/logo-color.png"
import axios from "axios";
import Modal from "../../components/modal/Modal.jsx";
import convertTime from "../../helpers/convertTime.jsx";
import Button from "../../components/button/button.jsx";
import convertLicence from "../../helpers/convertLicence.jsx";

function Fleet() {
    const {isAuth, setFleet, setList, park, setPark} = useContext(AuthContext)
    const [licence, setLicence] = useState('')


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

    let boo = licence.replace(/(\w{2}-\d{2}-\d{2})|(\d{2}-\d{2}-\w{2})|(\d{2}-\w{2}-\d{2})|(\w{2}-\d{2}-\w{2})|(\w{2}-\w{2}-\d{2})|(\d{2}-\w{2}-\w{2})|(\d{2}-\w{3}-\d{1})|(\d{1}-\w{3}-\d{2})|(\w{2}-\d{3}-\w{1})|(\w{1}-\d{3}-\w{2})|(\w{3}-\d{2}-\w{1})|(\d{1}-\w{2}-\d{3})/gm)
    let dateString = boo.replaceAll('/', '-')

    console.log(dateString)

    let listDetails = ''
    listDetails = Object.values(park).map((item, id) => {
            return (
                <tr key={id}>
                    <td>{item.plate}</td>
                    <td>{item.brand}</td>
                    <td>{item.model}</td>
                    <td>{convertTime(item.year)}</td>
                    <td>{convertTime(item.audit)}</td>
                    <td><Button className='delete-button' type='button'
                                onClick={() => handleDelete(item.plate)}>Verwijder</Button></td>
                </tr>
            )
        }
    )


    return (<>
            <div className="wrapper-fleet">
                <div className="text-box-fleet">
                    <h1>Welkom {isAuth.user.username}</h1>
                    <h3>Voeg je voertuig toe aan het wagenpark</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-fleet">
                            <input type="text" placeholder='KENTEKEN' id='licence' name='licence' maxLength="8"
                                   autoComplete="off" required="" onChange={handleChange} value={licence}/>
                            <Modal/>
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

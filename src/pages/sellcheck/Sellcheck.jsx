import './Sellcheck.css'
import axios from "axios";
import {useEffect, useState} from "react";
import notStolen from "../../helpers/notStolen.jsx";
import assessment from "../../helpers/assessment.jsx";
import insurance from "../../helpers/insurance.jsx";
import recall from "../../helpers/recall.jsx";
import {useParams} from "react-router-dom";
import uppercase from "../../helpers/uppercase.jsx";
import countDays from "../../helpers/countDays.jsx";
import getYear from "../../helpers/getYear.jsx";
import getBrandName from "../../helpers/getBrandName.jsx";
import noimage from '../../assets/no-image.png'

function Sellcheck() {
    const [sell, setSell] = useState([{
        assessmentyear: 'jaar laatste registratie tellerstand',
        assessment: 'tellerstandoordeel',
        notstolen: 'tenaamstellen_mogelijk',
        insurance: 'verzekerd',
        recall: 'openstaande terugroepactie',
        brand: 'merk',
        model: 'model',
        apk: "apk",
        build: "bouwjaar"
    }])
    const [car, setCar] = useState({});
    const [pic, setPic] = useState('');
    const [loading, toggleLoading] = useState(false);

    const {id} = useParams();

    useEffect(() => {

        async function handleCheck() {
            toggleLoading(true);

            try {
                const check = await axios.get(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-App-Token': `${import.meta.env.VITE_RDW_KEY}`
                    }
                })

                setSell({
                        brand: check.data[0].merk,
                        model: check.data[0].handelsbenaming,
                        build: check.data[0].datum_eerste_toelating_dt,
                        assessmentyear: check.data[0].jaar_laatste_registratie_tellerstand,
                        assessment: check.data[0].tellerstandoordeel,
                        notstolen: check.data[0].tenaamstellen_mogelijk,
                        insurance: check.data[0].wam_verzekerd,
                        recall: check.data[0].openstaande_terugroepactie_indicator,
                        apk: check.data[0].vervaldatum_apk_dt,
                    }
                )
            } catch (e) {
                console.error(e)
            }




            toggleLoading(false);


        }

        handleCheck()



    }, []);


    useEffect(() => {
        async function carId() {

            try {
                const idInfo = await axios.get(`https://api.fuelapi.com/v1/json/vehicles/?year=${getYear(sell.build)}&model=${getBrandName(sell.model)}&make=${sell.brand}&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1`,
                )
                setCar(idInfo.data[0].id)
                console.log(idInfo.data[0].id)

            } catch (e) {
                console.error(e)
            }

        }
        carId()
    }, [sell]);

    useEffect(() => {

        async function carPhoto() {

            try {
                const response = await axios.get(`https://api.fuelapi.com/v1/json/vehicle/${car}?productID=1&productFormatIDs=1&shotCode=037&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1`,
                )
                setPic(response.data.products[0].productFormats[0].assets[0].url)
                console.log(response.data.products[0].productFormats[0].assets[0].url)
            } catch (e) {
                console.error(e)
            }

        }
        carPhoto()
    }, [car]);


    return (
        <>
             <div className="wrapper-check">
                 {Object.keys(sell).length > 0 &&
                   <article className="search-result-box">
                        {loading && <p className='error'>Een moment geduld a.u.b</p>}
                       <span className="title-container">
                             <h1>Verkoopcheck {uppercase(sell.brand, sell.model)}</h1>
                            </span>
                        <p>Dit voertuig heeft {assessment(sell.assessment)} kilometerstand, en de laatste registratie
                            dateert uit het jaar {sell.assessmentyear}.</p>
                        <p>Uit de meest recente politie-gegevens blijkt dat deze
                            auto {notStolen(sell.notstolen)} gestolen geregistreerd staat.</p>
                        <p>De fabrikant heeft {recall(sell.recall)} terugroepactie voor dit voertuig, en je
                            bent {insurance(sell.insurance)}.</p>
                         <p>Over {countDays(sell.apk)} dagen verloopt de apk keuring van deze auto.</p>
                    </article> }
                <article className="car-box">
                    {pic ? <img className="car" src={pic} alt="Impressie van het voertuig"/> :
                        <img className="no-image" src={noimage} alt="Geen afbeelding beschikbaar"/>}
                </article>


            </div>
        </>
    );
}

export default Sellcheck;

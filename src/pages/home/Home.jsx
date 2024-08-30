import './Home.css'
import logo from '../../assets/logo-home-color.png'
import {Link} from "react-router-dom";


function Home() {
    return (<>
            <div className="wrapper">
                <div className="text-box">
                    <h1>APKdash</h1>
                    <p>Het runnen van een groot wagenpark vraagt om een goede administratie. Als ondernemer heb je
                        weinig
                        tijd om alle zaken nauwlettende in de gaten te houden. Met APKdash krijg je nooit meer een boete
                        op
                        de deurmat voor een verlopen APK-keuring. <Link to='/signup'>Registreer je nu!</Link></p>
                </div>
                <img src={logo} alt="afbeelding logo"/>
            </div>
            <div id='usp-section'>
                <h2>Voordelen</h2>
                <div className="cards">
                    <section className="card">
                        <article className="content">
                            <h3>Razendsnel</h3>
                            <p>De APK-vervaldata van jouw wagenpark is binnen één seconde zichtbaar op het scherm.
                                Dat kun je heel makkelijk weten welk voertuig naar de autogarage moet. Met APKdash
                                is dat een fluitje van een cent.
                            </p>
                        </article>
                    </section>
                    <section className="card">
                        <article className="content">
                            <h3>Betrouwbaar</h3>
                            <p>Onze informatie komt rechtstreeks van de RDW voertuiggegevens database en is 100 procent
                                betrouwbaar.
                                Met de gratis kentekencheck van APKdash heb je in één keer basisinformatie
                                paraat. Om te beginnen het merk, model en de APK-vervaldatum.</p>
                        </article>
                    </section>
                    <section className="card">
                        <article className="content">
                            <h3>Overzichtelijk</h3>
                            <p>Heb je snel een compleet beeld van je wagenpark nodig? Dankzij onze portaal krijg je in
                                één oogopslag de komende APK keuringen te zien. Het aanhouden van een rommelige
                                administratie is verleden tijd. </p>
                        </article>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Home;
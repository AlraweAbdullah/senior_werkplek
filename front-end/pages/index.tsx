import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Maakbaar Leuven</title>
            </Head>

            <Header />

            <main className="container my-5" style={{minHeight: '100vh'}}>
                <section className="row justify-content-center mb-5">
                    <div
                        className="col-md-8 text-center"
                        style={{
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h1 className="display-4">
                            De snelste manier om uw apparaat te repareren!
                        </h1>
                        <p className="lead">
                            Ontdek de kracht van de herstel-economie en de circulaire economie.
                        </p>
                    </div>
                </section>

                <section className="row justify-content-center">
                    <div
                        className="col-md-8"
                        style={{
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h2>Missie</h2>
                        <p>
                            Maakbaar Leuven daagt burgers, organisaties, overheid en bedrijven uit
                            om door middel van de herstel-economie, de circulaire economie een duw
                            in de rug te geven.
                        </p>

                        <ul>
                            <li>
                                Het eco-systeem versterken met nieuwe verbindingen, samenwerkingen
                                en innovatie.
                            </li>
                            <li>
                                Samenwerking met bedrijven en overheid als hefboom voor de Repair
                                transitie.
                            </li>
                            <li>
                                De sociale economie versterken door middel van jobs in de
                                hersteleconomie.
                            </li>
                            <li>
                                Het beleid voor circulaire economie steunen door in te spelen op
                                Leuven Smart & Circular City.
                            </li>
                        </ul>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Home;

import Head from 'next/head';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import React from 'react';
import AddDeviceType from '../../../components/deviceTypes/AddDeviceTypeForm';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Voeg een nieuw toestel-type toe</title>
            </Head>

            <Header></Header>
            <main style={{ marginTop: '20px', marginBottom: '60px', height: '100vh' }}>
                <section className="row justify-content-center">
                    <AddDeviceType />
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Home;
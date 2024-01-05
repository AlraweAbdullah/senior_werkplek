import Head from 'next/head';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import React from 'react';
import AddDeviceForm from '../../../../components/devices/addDeviceForm';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Voeg een nieuw toestel toe</title>
            </Head>

            <Header></Header>
            <main style={{ marginTop: '20px', marginBottom: '60px', height: '100vh', alignItems: 'center'}}>
                <section className="row justify-content-center">
                    <AddDeviceForm />
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Home;

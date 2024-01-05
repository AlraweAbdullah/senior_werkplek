import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';
import LogInForm from '../components/users/logInForm';

const logIn: React.FC = () => {
    return (
        <>
            <Head>
                <title>Inloggen</title>
            </Head>

            <Header></Header>
            <main style={{ marginTop: '10px', marginBottom: '60px', minHeight: '100vh' }}>
                <section className="row justify-content-center">
                    <LogInForm />
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default logIn;

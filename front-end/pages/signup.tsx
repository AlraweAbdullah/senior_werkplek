import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUpForm from '../components/users/signUpForm';
import React from 'react';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Aan melden</title>
            </Head>

            <Header></Header>
            <main style={{ marginTop: '10px', marginBottom: '20px', minHeight: '100vh' }}>
                <section className="row justify-content-center">
                    <SignUpForm />
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Home;

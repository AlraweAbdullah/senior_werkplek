import Head from 'next/head';

import React from 'react';
import Header from '../../../../../../../../components/Header';
import Footer from '../../../../../../../../components/Footer';
import QuestionsList from '../../../../../../../../components/questions/QuestionsList';


const logIn: React.FC = () => {
    return (
        <>
            <Head>
                <title>Questionair</title>
            </Head>

            <Header></Header>
            <main style={{ marginTop: '10px', marginBottom: '60px', minHeight: '100vh'}}>
                <section className="row justify-content-center">
                    <QuestionsList />
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default logIn;

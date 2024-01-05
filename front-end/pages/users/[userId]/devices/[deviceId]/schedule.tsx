import Head from 'next/head';
import Header from '../../../../../components/Header';
import Calendly from '../../../../../components/users/calandly';
import Footer from '../../../../../components/Footer';

const Schedule: React.FC = () => {
    return (
        <>
            <Head>
                <title>Maak een afspraak</title>
            </Head>
            
            <Header></Header>
            <main style={{minHeight: '100vh'}}>
                <section className="justify-content-center">
                    <Calendly problem={undefined}/>
                </section>
            </main>

            <Footer></Footer>
        </>
    );
};

export default Schedule;

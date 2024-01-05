import Head from 'next/head';
import Header from '../../../../../components/Header';
import Footer from '../../../../../components/Footer';
import UpdateDevice from '../../../../../components/devices/DeviceUpdateForm';

const Update: React.FC = () => {
    return (
        <>
            <Head>
                <title>Toestel aanpassen</title>
            </Head>
            <Header></Header>
            <main style={{ marginTop: '20px', marginBottom: '60px', minHeight: '100vh' }}>
                <section className="row justify-content-center">
                    <UpdateDevice />
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Update;

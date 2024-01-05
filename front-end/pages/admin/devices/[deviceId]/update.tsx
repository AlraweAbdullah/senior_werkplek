import Head from 'next/head';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import AdminUpdateDevice from '../../../../components/devices/AdminDeviceUpdateForm';

const Update: React.FC = () => {
    return (
        <>
            <Head>
                <title>Toestel aanpassen</title>
            </Head>
            <Header></Header>
            <main style={{ marginTop: '20px', marginBottom: '60px' }}>
                <section className="row justify-content-center">
                    <AdminUpdateDevice />
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Update;

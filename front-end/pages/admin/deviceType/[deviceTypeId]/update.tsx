import Head from 'next/head';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import UpdateDeviceType from '../../../../components/deviceTypes/AdminDeviceTypeUpdateForm';

const Update: React.FC = () => {
    return (
        <>
            <Head>
                <title>Toestel-type aanpassen</title>
            </Head>
            <Header></Header>
            <main style={{ marginTop: '20px', marginBottom: '60px', minHeight: '100vh' }}>
                <section className="row justify-content-center">
                    <UpdateDeviceType />
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Update;
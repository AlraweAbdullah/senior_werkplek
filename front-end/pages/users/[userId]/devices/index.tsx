import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Device } from '../../../../types';
import Header from '../../../../components/Header';
import DevicesOverview from '../../../../components/devices/devicesOverview';
import { useRouter } from 'next/router';
import UserService from '../../../../services/UserService';
import Footer from '../../../../components/Footer';

const Device: React.FC = () => {
    const [devices, setDevices] = useState<Array<Device>>();
    const router = useRouter();
    const userId: number = parseInt(router.query.userId as string);
    const getAllDevices = async () => {
        UserService.getUsersDevices(userId)
            .then((res) => res.json())
            .then((devices) => setDevices(devices))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (router.isReady) {
            getAllDevices();
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>Devices</title>
            </Head>
            <Header></Header>
            <main style={{ marginTop: '10px', marginBottom: '40px', minHeight: '100vh' }}>
                <section className="row justify-content-center">
                    <div className="col-6">
                        <DevicesOverview devices={devices} />
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Device;

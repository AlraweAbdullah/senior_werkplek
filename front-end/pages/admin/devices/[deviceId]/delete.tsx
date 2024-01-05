import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import DeviceService from '../../../../services/DeviceService';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Device } from '../../../../types';
import AdminDeleteDevice from '../../../../components/devices/adminDeleteDevice';

const DeviceInfo: React.FC = () => {
    const router = useRouter();

    const [device, setDevice] = useState<Device>();

    const deviceToDelete = async () => {
        const deviceId: number = Number(router.query.deviceId);
        DeviceService.getDevicesById(deviceId)
            .then((res) => res.json())
            .then((device) => setDevice(device))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (router.isReady) {
            deviceToDelete();
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>Verwijder toestel</title>
            </Head>
            <Header></Header>

            <main style={{ marginTop: '80px', marginBottom: '160px', minHeight: '100vh' }}>
                <section className="row justify-content-center">
                    <AdminDeleteDevice device={device} />
                </section>
            </main>

            <Footer></Footer>
        </>
    );
};

export default DeviceInfo;
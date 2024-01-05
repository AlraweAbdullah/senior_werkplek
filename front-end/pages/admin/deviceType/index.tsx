import Head from 'next/head';
import { useEffect, useState } from 'react';
import { DeviceType, User } from '../../../types';
import Header from '../../../components/Header';
import { useRouter } from 'next/router';
import Footer from '../../../components/Footer';
import DeviceTypeService from '../../../services/DeviceTypeSevice';
import DeviceTypesOverview from '../../../components/deviceTypes/AdminDeviceTypesOverview';

const DeviceTypes: React.FC = () => {
    const [deviceTypes, setDeviceTypes] = useState<Array<DeviceType>>();
    const router = useRouter();
    const getAllDeviceTypes = async () => {
        DeviceTypeService.getAllDeviceTypes()
            .then((res) => res.json())
            .then((deviceTypes) => setDeviceTypes(deviceTypes))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (router.isReady) {
            getAllDeviceTypes();

        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>Toestel-types</title>
            </Head>
            <Header />
            <main style={{ marginTop: '10px', marginBottom: '40px' }}>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-4">
                        <DeviceTypesOverview deviceTypes={deviceTypes} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default DeviceTypes;

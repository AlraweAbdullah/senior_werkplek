import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

import DeviceTypeService from '../../../../services/DeviceTypeSevice';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { DeviceType } from '../../../../types';
import DeleteDeviceType from '../../../../components/deviceTypes/DeleteDeviceTypeConfirmation';

const DeleteType: React.FC = () => {
    const router = useRouter();

    const [deviceType, setDeviceType] = useState<DeviceType>();

    const deviceTypeToDelete = async () => {
        const deviceTypeId: number = Number(router.query.deviceTypeId);
        await DeviceTypeService.getDeviceTypeById(deviceTypeId)
            .then((res) => res.json())
            .then((deviceType) => setDeviceType(deviceType))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (router.isReady) {
            deviceTypeToDelete();
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>Verwijder toestel-type</title>
            </Head>
            <Header></Header>

            <main style={{ marginTop: '80px', marginBottom: '160px', minHeight: '100vh' }}>
                <section className="row justify-content-center">
                    <DeleteDeviceType deviceType={deviceType} />
                </section>
            </main>

            <Footer></Footer>
        </>
    );
};

export default DeleteType;

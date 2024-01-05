import Head from 'next/head';
import { useEffect, useState } from 'react';
import { User } from '../../../types';
import Header from '../../../components/Header';
import AdminDevicesOverview from '../../../components/devices/AdminDevicesOverview';
import { useRouter } from 'next/router';
import UserService from '../../../services/UserService';
import Footer from '../../../components/Footer';

const Devices: React.FC = () => {
    const [users, setUsers] = useState<Array<User>>();
    const router = useRouter();
    const getAllUsers = async () => {
        UserService.getAllUsers()
            .then((res) => res.json())
            .then((users) => setUsers(users))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (router.isReady) {
            getAllUsers();

        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>Toestellen</title>
            </Head>
            <Header />
            <main style={{ marginTop: '10px', marginBottom: '40px' }}>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-6">
                        <AdminDevicesOverview users={users} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Devices;

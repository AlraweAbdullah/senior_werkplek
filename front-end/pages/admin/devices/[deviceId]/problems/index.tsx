import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Issue, Problem } from '../../../../../types';
import ProblemService from '../../../../../services/ProblemService';
import Header from '../../../../../components/Header';

import { useRouter } from 'next/router';
import Footer from '../../../../../components/Footer';
import AdminProblemsOverview from '../../../../../components/problems/AdminProblemsOverview';

const Problem: React.FC = () => {
    const [problems, setProblems] = useState<Array<Problem>>();
    const router = useRouter();
    const deviceId: number = parseInt(router.query.deviceId as string);
    const problemId: number = parseInt(router.query.problemId as string);
    const getAllProblems = async () => {
        ProblemService.getDeviceProblems(deviceId)
            .then((res) => res.json())
            .then((problems) => setProblems(problems))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (router.isReady) {
            getAllProblems();
        }
    }, [router.isReady, getAllProblems]);

    return (
        <>
            <Head>
                <title>Problems</title>
            </Head>
            <Header></Header>
            <main>
                <section className="row justify-content-center min-vh-100">
                    <div className="col-6">
                        <AdminProblemsOverview problems={problems} />
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    );
};

export default Problem;

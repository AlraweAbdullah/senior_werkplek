import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Problem } from '../../../../../../../types';
import ProblemService from '../../../../../../../services/ProblemService';
import Header from '../../../../../../../components/Header';
import AnswerForm from '../../../../../../../components/issues/answerForm';
import { useRouter } from 'next/router';
import Footer from '../../../../../../../components/Footer';
import { Issue } from '../../../../../../../types';


const Issue: React.FC = () => {
    const [problem, setProblem] = useState<Problem>();
    const [issue, setIssue] = useState<Issue>();
    const router = useRouter();
    const problemId: number = parseInt(router.query.problemId as string);
    const getProblemById = async () => {
        await ProblemService.getProblemById(problemId)
            .then((res) => res.json())
            .then((problem) => {
                console.log(problem);
                setProblem(problem)
                setIssue(problem.issue)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (router.isReady) {
            getProblemById();
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>Antwoord</title>
            </Head>
            <Header></Header>
            <main className='min-vh-100'>
                <h4 className="text-center mb-4">{issue?.description || ''}</h4>
                <AnswerForm problem={problem} issue={issue}></AnswerForm>

            </main>
            <Footer></Footer>
        </>
    );
};

export default Issue;

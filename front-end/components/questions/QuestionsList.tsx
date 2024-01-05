import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProblemService from '../../services/ProblemService';
import { Problem, Issue, User } from '../../types';
import UserService from '../../services/UserService';

const QuestionsList: React.FC = () => {
    const router = useRouter();
    const userId: number = parseInt(router.query.userId as string);
    const deviceId: number = parseInt(router.query.deviceId as string);
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);
    const [selectedSubQuestion, setSelectedSubQuestion] = useState<string | null>(null);
    const questions = [
        {
            id: 1,
            text: 'Afname zuigkracht',
            subQuestions: [
                { text: 'Hoge tonen, fluitend geluid', solution: 'Filter - stofzak​ schoonmaken' },
                { text: 'Verhogende motor geluid', solution: 'Schoonmaken\n, filter vervangen,​zak vervangen​' },
            ],
        },
        {
            id: 2, text: 'Stofzuiger reageert niet', subQuestions: [
                { text: 'Elektrische kabel controleren', solution: 'Filter - stofzak​ schoonmaken' },
                { text: 'Schakelaar nakijken', solution: 'lek herstellen met tape' }]
        },
        {
            id: 3,
            text: 'Kabel rolt niet op',
            subQuestions: [
                { text: 'Kabel ontwarren', solution: 'Controleer de kabel op knopen of obstakels' },
                { text: 'Oprolmechanisme smeren', solution: 'Smeer het oprolmechanisme' },
                { text: 'Mechanisme vervangen', solution: 'Vervang het oprolmechanisme indien defect' },
            ],
        },
        {
            id: 4,
            text: 'Krassen op de vloer',
            subQuestions: [
                { text: 'Borstelrollen controleren', solution: 'Controleer of de borstelrollen schoon zijn' },
                { text: 'Instellingen aanpassen', solution: 'Pas de hoogte-instelling aan om krassen te voorkomen' },
            ],
        },
        {
            id: 5,
            text: 'Wieltjes draaien niet',
            subQuestions: [
                { text: 'Wieltjes reinigen', solution: 'Maak de wieltjes schoon' },
                { text: 'Wieltjes vervangen', solution: 'Vervang de wieltjes indien nodig' },
            ],
        },
    ];

    const handlePrimaryQuestionClick = (questionId: number) => {
        setOpenQuestion((prevOpenQuestion) => (prevOpenQuestion === questionId ? null : questionId));
    };

    const handleNewToestelClick = () => {
        router.push(`/users/${userId}/devices`);

    }
    const handleSubmit = async (subQuestion: string, solution: string) => {
        // Assuming you have an Issue object created here
        const issue: Issue = {
            description: subQuestion,
            answer: solution,
            // ... other properties of Issue
        };

        const problem: Problem = {
            deviceId: deviceId,
            issue: issue,
            status: "gesloten"
        };


        const response = await ProblemService.addProblem(problem);
        const prob: Problem = await response.json();
        // Redirect to the problems page after submitting the form
        UserService.sendPDF(userId, prob.id)
        router.push(`/users/${userId}/devices/${deviceId}/problems`);
    };
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="mt-4 text-center">
                        {questions.map((question) => (
                            <div key={question.id} className="card mb-3">
                                {/* Card Header (Primary Question) */}
                                <div
                                    className={`card-header ${openQuestion === question.id ? 'bg-primary text-white' : ''}`}
                                    onClick={() => handlePrimaryQuestionClick(question.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {question.text}
                                </div>
                                {/* Card Body (Sub-questions) */}
                                {openQuestion === question.id && (
                                    <div className="card-body">
                                        {question.subQuestions.map((subQuestion, index) => (
                                            <div key={index} className="card mb-2">
                                                {/* Clickable Sub-question */}
                                                <div
                                                    className="card-body"
                                                    style={{
                                                        cursor: 'pointer',
                                                        textDecoration: 'none', // Remove underline
                                                        color: '#198754', // Adjust color to your preference
                                                    }}
                                                    onClick={() => {
                                                        setSelectedSubQuestion(subQuestion.text);
                                                        handleSubmit(subQuestion.text, subQuestion.solution);
                                                    }}
                                                >
                                                    {subQuestion.text}
                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                )}
                            </div>
                        ))}
                        <button
                            className="btn btn-primary mt-2"
                            onClick={() => handleNewToestelClick()} // Replace with your actual function
                        >
                            Mijn toestel is nieuwe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default QuestionsList;
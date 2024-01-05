import React, { useState } from 'react';
import { Issue, Problem } from '../../types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faReply } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import IssueService from '../../services/IssueService';
import StatusMessageParser from '../StatusMessageParser';


type Props = {
    problem: Problem;
    issue: Issue;
};

const AnswerForm: React.FC<Props> = ({ issue }: Props) => {
    const router = useRouter();
    const deviceId: number = parseInt(router.query.deviceId as string);
    const [newAnswer, setNewAnswer] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);

    const validate = (): boolean => {
        let isValid = true;
        setStatusMessage(null);

        if (!newAnswer || newAnswer.trim() === '') {
            setStatusMessage({
                type: 'error',
                message: 'Vul een antwoord in.'
            });
            isValid = false;
        }

        return isValid;
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        console.log('New Answer:', newAnswer);
        console.log('Issue:', issue);
        const response = await IssueService.updateIssueWithAnswer(
            issue.id,
            newAnswer,
            issue.description
        );

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: 'Antwoord succesvol toegevoegd!!'
            });
            setTimeout(() => {
                router.push(`/admin/devices/${deviceId}/problems`);
            }, 2000);
        } else {
            setStatusMessage({
                type: 'error',
                message: 'Er ging iets fout. Probeer opnieuw'
            });
        }
    };

    return (
        <main style={{ marginTop: '10px', marginBottom: '40px' }}>
            <StatusMessageParser statusMessage={statusMessage} />
            <section className="row justify-content-center">
                <div className="col-8">
                    <form onSubmit={handleFormSubmit}>
                        <label className="mb-4 col-12">
                            <textarea
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                rows={4}
                                cols={50}
                                placeholder="Voer hier het antwoord in..."
                                className="form-control col-12"
                            />
                        </label>
                        <div className="d-flex justify-content-between">
                            <Link href={`/admin/devices/${deviceId}/problems`} className="btn btn-outline-primary px-4 fs-6">
                                <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
                            </Link>
                            <button type="submit" className="btn btn-outline-primary px-4 fs-6">
                                <FontAwesomeIcon icon={faReply} /> Verstuur antwoord
                            </button>
                        </div>

                        {statusMessage && <p>{statusMessage.message}</p>}
                    </form>
                </div>
            </section>
        </main>
    );
};

export default AnswerForm;

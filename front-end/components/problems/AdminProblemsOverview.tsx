import React, { useState } from 'react';
import { Problem } from '../../types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faReply } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';


type Props = {
    problems: Array<Problem>;
};

const AdminProblemsOverview: React.FC<Props> = ({ problems }: Props) => {
    const router = useRouter();
    const deviceId: number = parseInt(router.query.deviceId as string);
    const problemId: number = parseInt(router.query.problemId as string);
    const [newDescription, setNewDescription] = useState('');
    const [newDescriptionError, setNewDescriptionError] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);

    return (
        <>
            {problems && problems.length > 0 ? (
                <>
                    <h4 className="text-center mb-4">Overzicht problemen</h4>
                    <table className="table table-hover table-borderd">
                        <thead className="table table-dark thead">
                            <tr>
                                <th scope="col">Omschrijving</th>
                                <th scope="col">Oplossing</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {problems.map((problem, index) => (
                                <tr key={index}>
                                    <td>{problem.issue.description}</td>
                                    <td>{problem.issue.answer ? problem.issue.answer : '_____'}</td>
                                    <td className="text-end">
                                        {!problem.issue.answer && (
                                            <Link href={`/admin/devices/${deviceId}/problems/${problem.id}/issue`} className="btn btn-outline-primary px-4 fs-6">
                                                <FontAwesomeIcon size="xs" icon={faReply} /> antwoord
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p className="text-center">Dit toestel heeft geen problemen.</p>
            )}

            <br />
            <Link href={`/admin/devices`} className="btn btn-outline-primary px-4 fs-6">
                <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
            </Link>
        </>
    );
};

export default AdminProblemsOverview;
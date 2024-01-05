import React, { useState } from 'react';
import { User } from '../../types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {
    users: User[];
};

const AdminDevicesOverview: React.FC<Props> = ({ users }) => {
    const [selectedStatus, setSelectedStatus] = useState('All');

    return (
        <>
            <div className="mb-4">
                <label className="me-2">Filter op status:</label>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="All">Alle statussen</option>
                    <option value="In gebruik">In gebruik</option>
                    <option value="throwAway">Throw Away</option>
                    <option value="donate">Donate</option>
                </select>
            </div>

            {users && users.length > 0 ? (
                <>
                    <h4 className="text-center mb-4">Overzicht toestellen</h4>
                    <table className="table table-hover table-borderd">
                        <thead className="table table-dark thead">
                            <tr>
                                <th className="text-center" scope="col">Toestel</th>
                                <th className="text-center" scope="col">Type</th>
                                <th className="text-center" scope="col">Gebruiker</th>
                                <th className="text-center" scope="col">Status</th>
                                <th className="text-center" scope="col">Problemen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                                .flatMap(user =>
                                    user.devices
                                        .filter(device => selectedStatus === 'All' || device.status === selectedStatus)
                                        .map(device => (
                                            <tr key={device.id}>
                                                <td className="text-center border-start">{device.name}</td>
                                                <td className="text-center border-start">{device.deviceType.name}</td>
                                                <td className="text-center border-start">{user.email}</td>
                                                <td className="text-center border-start">{device.status}</td>
                                                <td className="text-center border-start border-end">
                                                    <Link href={`/admin/devices/${device.id}/problems`} passHref>
                                                        <button className="btn btn-outline-info" title="Problemen">
                                                            <FontAwesomeIcon size="xs" icon={faInfo} />{' '}
                                                        </button>
                                                    </Link>
                                                </td>
                                                
                                            </tr>
                                        ))
                                )}
                        </tbody>
                    </table>
                </>
            ) : (
                <p className="text-center">Dit toestel heeft geen problemen.</p>
            )}
        </>
    );
};

export default AdminDevicesOverview;

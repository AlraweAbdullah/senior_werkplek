import React from 'react';
import { DeviceType, User } from '../../types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeviceTypeService from '../../services/DeviceTypeSevice';


type Props = {
    deviceTypes: DeviceType[];
};

const DeviceTypesOverview: React.FC<Props> = ({ deviceTypes }) => {


    return (
        <>
            {deviceTypes && deviceTypes.length > 0 ? (
                <>
                    <h4 className="text-center mb-4">Overzicht toestel-types</h4>

                    <div className="mb-4 d-flex align-items-center justify-content-center text-center">
                        <Link
                            href={`/admin/deviceType/add`}
                            className="btn btn-outline-primary me-2"
                            title="Toevoegen"
                        >
                            <FontAwesomeIcon size="xs" icon={faPlus} />
                        </Link>
                        <h5 className="mb-0 text-black">Nieuw toestel-type toevoegen</h5>
                    </div>



                    <table className="table table-hover table-borderd">
                        <thead className="table table-dark thead">
                            <tr>
                                <th className="text-center" scope="col">Type</th>
                                <th className="text-center" scope="col">Verwijderen</th>
                                <th className="text-center" scope="col">Aanpassen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deviceTypes.map((deviceType) => (
                                <tr key={deviceType.id}>
                                    <td className="text-center">{deviceType.name}</td>
                                    <td className="text-center"> <Link
                                        href={`/admin/deviceType/${deviceType.id}/delete`}
                                        className="btn btn-outline-danger me-2"
                                        title="Verwijderen"
                                    >
                                        <FontAwesomeIcon size="xs" icon={faTrash} />{' '}
                                    </Link></td>
                                    <td className="text-center"> <Link
                                        href={`/admin/deviceType/${deviceType.id}/update`}
                                        className="btn btn-outline-primary me-2"
                                        title="Aanpassen"
                                    >
                                        <FontAwesomeIcon size="xs" icon={faPen} />{' '}
                                    </Link></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </>
            ) : (
                <p className="text-center">Nog geen toestel-types toegevoegd</p>
            )}

        </>
    );
};

export default DeviceTypesOverview;
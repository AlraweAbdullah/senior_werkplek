import React from 'react';
import { Device } from '../../types';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
    devices: Array<Device>;
};

const DevicesOverview: React.FC<Props> = ({ devices }: Props) => {
    const router = useRouter();
    const userId: number = parseInt(router.query.userId as string);


    const inUseDevices = devices ? devices.filter(device => device.status === "In gebruik") : [];

    return (
        <>
            {inUseDevices && (
                <>
                    {inUseDevices.length > 0 ? (
                        <>
                            <h4 className="text-center mb-4">Uw toestellen</h4>

                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                                {inUseDevices.map((device) => (
                                    <div key={device.id} className="col mb-4">
                                        <Card
                                            style={{
                                                borderRadius: '10px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            <Card.Body>
                                                <Card.Title>{device.name}</Card.Title>
                                                <Card.Text>
                                                    {device.deviceType}
                                                    <br />
                                                    Datum:{' '}
                                                    {device.purchaseDate
                                                        ? new Date(
                                                            device.purchaseDate
                                                        ).toLocaleDateString()
                                                        : 'Onbekend'}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer className="text-center">
                                                <Link
                                                    href={`/users/${userId}/devices/${device.id}/update`}
                                                    className="btn btn-outline-primary me-2"
                                                    title="Aanpassen"
                                                >
                                                    <FontAwesomeIcon size="xs" icon={faPen} />{' '}
                                                </Link>
                                                <Link
                                                    href={`/users/${userId}/devices/${device.id}/delete`}
                                                    className="btn btn-outline-danger me-2"
                                                    title="Verwijderen"
                                                >
                                                    <FontAwesomeIcon size="xs" icon={faTrash} />{' '}
                                                </Link>
                                                <Link
                                                    href={`/users/${userId}/devices/${device.id}/problems`}
                                                    className="btn btn-outline-info me-2"
                                                    title="Problemen"
                                                >
                                                    <FontAwesomeIcon size="xs" icon={faInfo} />{' '}
                                                </Link>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-center">U hebt geen toestellen met status "In gebruik".</p>
                    )}
                </>
            )}
        </>
    );
};

export default DevicesOverview;

import React from 'react';
import { Device } from '../../types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeviceService from '../../services/DeviceService';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
type Props = {
    device: Device;
};

const AdminDeleteDevice: React.FC<Props> = ({ device }: Props) => {
    const router = useRouter();
    return (
        <div
            className="col-6"
            style={{
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            {device && (
                <>
                    <h4 className="text-center mb-4">Verwijder toestel</h4>
                    <p>
                        Verwijder toestel met naam: <b>{device.name} </b>?
                    </p>
                    <Link
                        href={`/admin/dashboard/devices`}
                        className="btn btn-outline-primary px-4 fs-6"
                    >
                        <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
                    </Link>
                    <Button
                        variant="outline-danger"
                        onClick={async () => {

                            await DeviceService.deletedeviceById(device.id);
                            router.push(`/admin/dashboard/devices`);
                        }}
                        className="px-4 fs-6 ms-2"
                    >
                        <FontAwesomeIcon size="xs" icon={faTrash} /> Ja
                    </Button>
                </>
            )}
        </div>
    );
};

export default AdminDeleteDevice;

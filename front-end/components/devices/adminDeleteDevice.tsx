import React, { useState } from 'react';
import { Device, DeviceInput } from '../../types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faGift, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeviceService from '../../services/DeviceService';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import StatusMessageParser from '../StatusMessageParser';

type Props = {
    device: Device;
};

const adminDeleteDevice: React.FC<Props> = ({ device }: Props) => {
    const router = useRouter();
    const userId = parseInt(router.query.userId as string);
    const [statusMessage, setStatusMessage] = useState(null);

    const handleSubmit = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();

        const response = await DeviceService.deletedeviceById(device.id);
        const data = await response.json();

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Uw toestel is verwijderd.`,
            });

            setTimeout(() => {
                router.push('/admin/devices');
            }, 2000);
        } else {
            setStatusMessage({
                type: 'error',
                message: data.errorMessage,
            });
        }
    };


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
                    <StatusMessageParser statusMessage={statusMessage} />
                    <p>
                        Verwijder toestel met naam: <b>{device.name} </b>?
                    </p>
                    <Link
                        href={`/admin/devices`}
                        className="btn btn-outline-primary px-4 fs-6"
                    >
                        <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
                    </Link>
                    <Button
                        variant="outline-danger"
                        onClick={handleSubmit}
                        className="px-4 fs-6 ms-2"
                    >
                        <FontAwesomeIcon size="xs" icon={faTrash} /> Toestel verwijderen
                    </Button>
                </>
            )}
        </div>
    );
};

export default adminDeleteDevice;

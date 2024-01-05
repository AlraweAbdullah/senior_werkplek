import React, { useState } from 'react';
import { DeviceType } from '../../types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeviceTypeService from '../../services/DeviceTypeSevice';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import StatusMessageParser from '../StatusMessageParser';

type Props = {
    deviceType: DeviceType;
};



const DeleteDeviceType: React.FC<Props> = ({ deviceType }: Props) => {
    const router = useRouter();
    const [statusMessage, setStatusMessage] = useState(null);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const response = await DeviceTypeService.deleteDeviceTypeById(deviceType.id);
        const data = await response.json();

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Toestel-type is verwijderd.`,
            });

            setTimeout(() => {
                router.push('/admin/deviceType');
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
            {deviceType && (
                <>
                    <h4 className="text-center mb-4">Verwijder toestel-type</h4>
                    <StatusMessageParser statusMessage={statusMessage} />
                    <p>
                        Verwijder toestel-type met naam: <b>{deviceType.name} </b>?
                    </p>
                    <Link
                        href={`/admin/deviceType`}
                        className="btn btn-outline-primary px-4 fs-6"
                    >
                        <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
                    </Link>
                    <Button
                        variant="outline-danger"
                        onClick={handleSubmit}
                        className="px-4 fs-6 ms-2"
                    >
                        <FontAwesomeIcon size="xs" icon={faTrash} /> Ja
                    </Button>
                </>
            )}
        </div>
    );
};

export default DeleteDeviceType;

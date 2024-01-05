import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StatusMessageParser from '../StatusMessageParser';

import { Device, DeviceInput, DeviceType, DeviceTypeInput } from '../../types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DeviceTypeService from '../../services/DeviceTypeSevice';
import DeviceService from '../../services/DeviceService';

const AdminUpdateDeviceType: React.FC = () => {
    const router = useRouter();
    const deviceTypeId: number = parseInt(router.query.deviceTypeId as string);
    const [name, setName] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const deviceTypeInput: DeviceTypeInput = {
            id: deviceTypeId,
            name,
        };

        const response = await DeviceTypeService.updateDeviceType(deviceTypeInput);
        const data = await response.json();

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Uw toestel-type is geüpdate.`,
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
        <>
            <article
                className="col-4"
                style={{
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>Pas toestel-type aan</h5>

                <StatusMessageParser statusMessage={statusMessage} />



                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Naam van het toestel-type</Form.Label>
                        <Form.Control
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </Form.Group>

                    <Link
                        href={`/admin/deviceType`}
                        className="btn btn-outline-danger px-4 fs-6"
                    >
                        <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
                    </Link>
                    <Button variant="outline-primary" type="submit" className="ms-2">
                        Aanpassen
                    </Button>
                </Form>
            </article>
        </>
    );
};

export default AdminUpdateDeviceType;

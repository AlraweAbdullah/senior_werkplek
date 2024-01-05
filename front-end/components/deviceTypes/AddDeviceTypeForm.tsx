import React, { useEffect, useState } from 'react';
import DeviceService from '../../services/DeviceService';
import StatusMessageParser from '../StatusMessageParser';
import { Button, Form } from 'react-bootstrap';
import { DeviceInput, DeviceType, DeviceTypeInput } from '../../types';
import { useRouter } from 'next/router';
import DeviceTypeService from '../../services/DeviceTypeSevice';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddDeviceType: React.FC = () => {
    const router = useRouter();

    const [name, setName] = useState('');

    const [statusMessage, setStatusMessage] = useState(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const deviceTypeInput: DeviceTypeInput = {
            name,
        };

        const response = await DeviceTypeService.addDeviceType(deviceTypeInput);
        const data = await response.json();

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Uw nieuw toestel-type is toegevoegd.`,
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
            <article className="col-4" style={{ padding: '20px' }}>
                <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Voeg een nieuw toestel-type toe
                </h5>
                <StatusMessageParser statusMessage={statusMessage} />
                <Form
                    onSubmit={handleSubmit}
                    style={{
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                    }}
                >
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






                    <Button variant="outline-primary" type="submit" >
                        Toevoegen
                    </Button>
                    <br />
                    <Link href={`/admin/deviceType`} className="btn btn-outline-danger px-4 fs-6" style={{ marginTop: '20px' }}>
                        <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
                    </Link>
                </Form>
            </article >
        </>
    );
};

export default AddDeviceType;

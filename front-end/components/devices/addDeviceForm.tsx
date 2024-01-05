import React, { useEffect, useState } from 'react';
import DeviceService from '../../services/DeviceService';
import StatusMessageParser from '../StatusMessageParser';
import { Button, Form } from 'react-bootstrap';
import { DeviceInput, DeviceType } from '../../types';
import { useRouter } from 'next/router';
import DeviceTypeService from '../../services/DeviceTypeSevice';

import QuestionService from '../../services/QuestionService';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const AddDeviceForm: React.FC = () => {
    const router = useRouter();
    const userId: number = parseInt(router.query.userId as string);
    const [deviceTypes, setDeviceTypes] = useState<Array<DeviceType>>();

    const [name, setName] = useState('');
    const [deviceTypeId, setDeviceTypeId] = useState<number>();

    const [purchaseDate, setpurchaseDate] = useState<Date>();

    const [nameError, setNameError] = useState('');
    const [deviceTypeIdError, setDeviceTypeIdError] = useState('');
    const [purchaseDateError, setpurchaseDateError] = useState('');

    const [statusMessage, setStatusMessage] = useState(null);

    const validate = (): boolean => {
        let isValid = true;
        setNameError('');
        setDeviceTypeIdError('');
        setpurchaseDateError('');

        setStatusMessage(null);

        if (!name && name.trim() === '') {
            setNameError('Vul de modelnaam van uw toestel in.');
            isValid = false;
        }

        if (!deviceTypeId) {
            setDeviceTypeIdError('Kies het type toestel');
            isValid = false;
        }

        return isValid;
    };

    const getDeviceTypes = async () => {
        DeviceTypeService.getAllDeviceTypes()
            .then((res) => res.json())
            .then((deviceTypes) => setDeviceTypes(deviceTypes));
    };

    useEffect(() => {
        getDeviceTypes();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const deviceInput: DeviceInput = {
            name,
            purchaseDate,
            deviceTypeId,
            userId,
        };

        const response = await DeviceService.addDevice(deviceInput);
        const data = await response.json();

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Uw nieuw toestel is toegevoegd.`,
            });
           
           

            setTimeout(() => {
                if(deviceTypeId != 1){
                    router.push(`/users/${userId}/devices`);
                }else{
                    router.push(`/users/${userId}/devices/${data.id}/deviceType/${deviceTypeId}/questions`);

                }
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
                    Voeg een nieuw toestel toe
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
                        <Form.Label htmlFor="name">Modelnaam van het toestel</Form.Label>
                        <Form.Control
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <Form.Text className="text-muted">
                            {nameError && <div className="text-danger">{nameError}</div>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="purchaseDate">Aankoopdatum</Form.Label>
                        <Form.Control
                            id="purchaseDate"
                            type="date"
                            onChange={(event) => {
                                setpurchaseDate(new Date(event.target.value));
                            }}
                        />
                        <Form.Text className="text-muted">
                            {purchaseDateError && (
                                <div className="text-danger">{purchaseDateError}</div>
                            )}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="selectDeviceType">Toestel type</Form.Label>
                        <Form.Select
                            defaultValue={'DEFAULT'}
                            id="selectDeviceType"
                            onChange={(event) => {
                                setDeviceTypeId(parseInt(event.target.value));
                            }}
                        >
                            <option value="DEFAULT" disabled>
                                kies een toestel type ...
                            </option>
                            {deviceTypes &&
                                deviceTypes.map((deviceType, index) => (
                                    <option key={index} value={deviceType.id}>
                                        {deviceType.name}{' '}
                                    </option>
                                ))}
                        </Form.Select>

                        <Form.Text>
                            {deviceTypeIdError && (
                                <div className="text-danger">{deviceTypeIdError}</div>
                            )}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="outline-primary" type="submit" >
                        Toevoegen
                    </Button>
                    <br />
                    <Link href={`/users/${userId}/devices`} className="btn btn-outline-danger px-4 fs-6" style={{ marginTop: '20px' }}>
                        <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
                    </Link>
                </Form>
            </article >
        </>
    );
};

export default AddDeviceForm;

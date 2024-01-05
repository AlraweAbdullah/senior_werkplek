import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StatusMessageParser from '../StatusMessageParser';

import { Device, DeviceInput, DeviceType } from '../../types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DeviceTypeService from '../../services/DeviceTypeSevice';
import DeviceService from '../../services/DeviceService';

const UpdateDevice: React.FC = () => {
    const router = useRouter();
    const deviceId: number = parseInt(router.query.deviceId as string);

    const userId = parseInt(router.query.userId as string);

    const [deviceTypes, setDeviceTypes] = useState<Array<DeviceType>>();

    const [name, setName] = useState('');
    const [deviceTypeId, setDeviceTypeId] = useState<number>();

    const [purchaseDate, setpurchaseDate] = useState<string>();

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

    const deviceToUpdate = async () => {
        DeviceService.getDevicesById(deviceId)
            .then((res) => res.json())
            .then((device: Device) => {
                setName(device.name);

                if (device.purchaseDate != null) {
                    setpurchaseDate(device.purchaseDate.toString().split('T')[0]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDeviceTypes = async () => {
        DeviceTypeService.getAllDeviceTypes()
            .then((res) => res.json())
            .then((deviceTypes) => setDeviceTypes(deviceTypes));
    };

    useEffect(() => {
        if (router.isReady) {
            getDeviceTypes();
            deviceToUpdate();
        }
    }, [router.isReady]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const deviceInput: DeviceInput = {
            name,
            purchaseDate: new Date(purchaseDate),
            deviceTypeId,
        };

        const response = await DeviceService.updateDevice(deviceId, deviceInput);
        const data = await response.json();

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Uw toestel is geüpdate.`,
            });

            setTimeout(() => {
                router.push('/users/' + userId + '/devices');
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
                <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>Pas toestel aan</h5>
                <StatusMessageParser statusMessage={statusMessage} />
                <Form onSubmit={handleSubmit}>
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
                            value={purchaseDate}
                            onChange={(event) => {
                                setpurchaseDate(event.target.value);
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
                    <Link
                        href={`/users/${userId}/devices`}
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

export default UpdateDevice;

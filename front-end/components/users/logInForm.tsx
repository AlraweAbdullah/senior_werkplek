import React, { useState } from 'react';
import UserService from '../../services/UserService';
import StatusMessageParser from '../StatusMessageParser';
import { Button, Form } from 'react-bootstrap';
import { User } from '../../types';
import { useRouter } from 'next/router';

const LogInForm: React.FC = () => {
    const router = useRouter();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setemailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [statusMessage, setStatusMessage] = useState(null);

    const validate = (): boolean => {
        let isValid = true;
        setemailError('');
        setPasswordError('');

        setStatusMessage(null);

        if (!email && email.trim() === '') {
            setemailError('Ongeldig e-mailadres.');
            isValid = false;
        }

        if (!password && password.trim() === '') {
            setPasswordError('Wachtwoord is ongeldig.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const user: User = {
            email,
            password,
        };

        const response = await UserService.login(user);
        const data = await response.json();

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Welcome ${email}`,
            });
            const token = data.token;
            const user = data.user;

            sessionStorage.setItem('token', JSON.stringify(token));
            sessionStorage.setItem('user', JSON.stringify(user));

            setTimeout(() => {
                router.push('/');
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
                <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>Inloggen</h5>
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
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            id="email"
                            type="text"
                            value={email}
                            onChange={(event) => {
                                setemail(event.target.value);
                            }}
                        />
                        <Form.Text className="text-muted">
                            {emailError && <div className="text-danger">{emailError}</div>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="password">Wachtwoord</Form.Label>
                        <Form.Control
                            id="password"
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <Form.Text className="text-muted">
                            {passwordError && <div className="text-danger">{passwordError}</div>}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Inloggen
                    </Button>
                </Form>
            </article>
        </>
    );
};

export default LogInForm;

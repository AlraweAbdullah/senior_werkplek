import React, { useState } from 'react';
import UserService from '../../services/UserService';
import StatusMessageParser from '../StatusMessageParser';
import { Button, Form } from 'react-bootstrap';
import { User } from '../../types';
import { useRouter } from 'next/router';

const SignUpForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const [statusMessage, setStatusMessage] = useState(null);

    const validate = (): boolean => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setLastNameError('');

        setStatusMessage(null);

        if (!email && email.trim() === '') {
            setEmailError('Voer een geldig e-mailadres in.');
            isValid = false;
        }

        if (!password || password.trim().length < 8) {
            setPasswordError('Wachtwoord moet minstens 8 tekens lang zijn.');
            isValid = false;
        }

        if (!name && name.trim() === '') {
            setNameError('Voer uw voornaam in.');
            isValid = false;
        }
        if (!lastName && lastName.trim() === '') {
            setLastNameError('Voer uw achternaam in.');
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
            lastName,
            name,
            role: 'user',
        };
        const response = await UserService.signup(user);

        const data = await response.json();

        if (response.status === 200) {
            setStatusMessage({
                type: 'success',
                message: `Gebruiker is aangemaakt, inloggen.`,
            });
            setTimeout(() => {
                router.push('/login');
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
                <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>Aanmelden</h5>
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
                        <Form.Label htmlFor="name">Voornaam</Form.Label>
                        <Form.Control
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <Form.Text className="text-muted">
                            {emailError && <div className="text-danger">{nameError}</div>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lastName">Achternaam</Form.Label>
                        <Form.Control
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                        />
                        <Form.Text className="text-muted">
                            {emailError && <div className="text-danger">{lastNameError}</div>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            id="email"
                            type="text"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <Form.Text className="text-muted">
                            {emailError && <div className="text-danger">{emailError}</div>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="password">Password</Form.Label>
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
                    <Button variant="outline-primary" type="submit">
                        Aanmelden
                    </Button>
                </Form>
            </article>
        </>
    );
};

export default SignUpForm;

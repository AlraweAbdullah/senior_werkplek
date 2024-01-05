import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '../types';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>(null);

    const handleLogout = () => {

        sessionStorage.clear();

        window.location.href = '/';
    };

    useEffect(() => {
        const sessionUser = sessionStorage.getItem('user');
        if (sessionUser != null) {
            const user: User = JSON.parse(sessionUser);
            if (user != undefined) {
                setUser(user);
            }
        }
    }, []);

    return (
        <header className="p-3 mb-3 border-bottom text-white custom-color">
            <div className="container">
                <p className="fs-2 mb-2 mb-lg-0 ">Maakbaar Leuven​</p>
                <nav className="nav justify-content-center">
                    <Link
                        href="/"
                        className={`link nav-link px-4 fs-5 ${router.pathname === '/' ? 'active' : ''}`}
                    >
                        Home
                    </Link>

                    {user ? (
                        <>
                            {user.role === 'admin' ? (
                                <>

                                    <Link
                                        href="/admin/devices"
                                        className={`link nav-link px-4 fs-5 ${router.pathname.startsWith('/admin/devices') ? 'active' : ''
                                            }`}
                                    >
                                        Toestellen
                                    </Link>
                                    <Link
                                        href="/admin/deviceType"
                                        className={`link nav-link px-4 fs-5 ${router.pathname.startsWith('/admin/deviceType')  ? 'active' : ''}`}
                                        
                                    >
                                        Toestel-types
                                    </Link>

                                </>
                            ) : (
                                <>

                                    <Link
                                        href={`/users/${user.id}/devices`}
                                        className={`link nav-link px-4 fs-5 ${router.pathname.startsWith('/users/[userId]/devices') && !router.pathname.endsWith('add') ? 'active' : ''
                                            }`}
                                    >
                                        Overzicht toestellen
                                    </Link>
                                        <Link
                                            href={`/users/${user.id}/devices/add`}
                                            className={`link nav-link px-4 fs-5 ${router.pathname.endsWith(`/users/[userId]/devices/add`) ? 'active' : ''
                                                }`}
                                        >
                                            Nieuw toestel toevoegen
                                        </Link>

                                </>
                            )}


                            <Link
                                href="#"
                                className={`link nav-link px-4 fs-5 ${router.pathname === '/logout' ? 'active' : ''}`}
                                onClick={handleLogout}
                            >
                                Uitloggen
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={`link nav-link px-4 fs-5 ${router.pathname === '/login' ? 'active' : ''}`}
                            >
                                Inloggen
                            </Link>
                            <Link
                                href="/signup"
                                className={`link nav-link px-4 fs-5 ${router.pathname === '/signup' ? 'active' : ''}`}
                            >
                                Aanmelden
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
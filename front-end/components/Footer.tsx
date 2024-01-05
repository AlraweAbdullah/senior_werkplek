import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
    return (
        <footer className="p-3 border-top text-white text-center custom-color d-flex align-items-center justify-content-center">
            <div className="social-links me-4">
                <a href="https://www.facebook.com/maakbaarleuven" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: '#316FF6' }} />
                </a>
            </div>
            <div className="social-links me-4">
                <a href="https://www.instagram.com/maakbaar.leuven/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="2x" style={{ color: '#fa7e1e' }} />
                </a>
            </div>

            <p className="fs-6 mb-2 mb-lg-0 footer">Maakbaar Leuven​ {new Date().getFullYear()}</p>

        </footer>
    );
};

export default Footer;


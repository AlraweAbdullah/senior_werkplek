import * as React from 'react';


type Props = {
    name: string;
};
const EmailComp: React.FC<Props> = ({name}: Props) => {
    return (
        <>
        <head><img src="wpp-2324-team-14\back-end\util\img\Maakbaarleuven_logo.png" alt="logo" /></head>
        <body style={container}>
            <p>Beste {name},</p>
            <p>Bedankt om een account aan te maken bij maakbaarleuven!</p>
            <p style={footer}>Maakbaar Leuven​ {new Date().getFullYear()}</p>
        </body>
        </>
    )
}

const footer = {
    color: '#8898aa',
    fontSize: '12px',
}

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};

export default EmailComp
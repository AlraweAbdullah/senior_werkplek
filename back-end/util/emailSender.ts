import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import EmailComp from './baseEmail';
import basePdfHtml from './basePdfMail';

const sendMail = async (email: string, name: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });


    const emailHtml = render(EmailComp({ name }));

    const options = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'hello world',
        html: emailHtml,
    };

    try {
        const info = await transporter.sendMail(options);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log(error);
    }
}

const sendPdf = async (pdfBytes: Uint8Array, email: string, name: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const emailHtml = render(basePdfHtml({ name }));

    const options = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Probleem overzicht',
        html: emailHtml,
        attachments: [
            {
                filename: 'Maakbaar leuven - probleem specifiek manual.pdf',
                content: Buffer.from(pdfBytes), // Convert Uint8Array to Buffer
            },
        ],
    };

    try {
        const info = await transporter.sendMail(options);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log(error);
    }
}

export default { sendMail, sendPdf };

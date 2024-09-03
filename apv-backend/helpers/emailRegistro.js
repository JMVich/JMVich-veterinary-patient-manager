import nodemailer from 'nodemailer';
import brevo from "@getbrevo/brevo";

const emailRegistro = async (datos) => {

    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY
    );

    const { email, nombre, token } = datos;
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = "APV - Comprueba tu cuenta ✔";
        sendSmtpEmail.to = [
            { email: email, name: nombre },
        ];
        sendSmtpEmail.htmlContent = ` <p> Hola <strong>${nombre}</strong></p> 
        <p>Para confirmar tu cuenta en APV, haz click en el siguiente enlace: 
        <a href='${process.env.FRONTEND_URL}/confirmar/${token}'>Comprobar Cuenta</a>
        </p>
        <p>Si no creaste esta cuenta puedes eliminar este mensaje</p>
        `;
        sendSmtpEmail.sender = {
            name: "APV",
            email: "juanviscovich14@gmail.com",
        };

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export default emailRegistro;
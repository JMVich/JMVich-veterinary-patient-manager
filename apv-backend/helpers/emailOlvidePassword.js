import nodemailer from 'nodemailer';
import brevo from "@getbrevo/brevo";

const emailOlvidePassword = async (datos) => {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY
    );

    const { email, nombre, token } = datos;

    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = "APV - Reestablece tu contraseña";
        sendSmtpEmail.to = [
            { email: email, name: nombre },
        ];
        sendSmtpEmail.htmlContent = ` <p> Hola <strong>${nombre}</strong></p> 
        <p>Para generar una nueva contraseña, haz click en el siguiente enlace: 
        <a href='${process.env.FRONTEND_URL}/olvide-password/${token}'>Reestablecer contraseña</a>
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

export default emailOlvidePassword;


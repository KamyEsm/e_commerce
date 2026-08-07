"use server";

import { Resend } from 'resend';
import { emailSchema } from "@/lib/validation/auth";

export async function emailSend(receptor: string, subject: string, html: string) {
    const apiKey = process.env.EMAIL_SENDER_API_KEY;
    const fromEmail = process.env.EMAIL_SENDER;

    if (!apiKey || !fromEmail) {
        return { success: false, error: "The email server settings are incomplete." };
    }

    const emailValRes = await emailSchema.safeParseAsync(receptor);

    if (!emailValRes.success) {
        return { success: false, error: "The entered email format is not valid." };
    }

    const resend = new Resend(apiKey);

    try {
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: emailValRes.data,
            subject,
            html,
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        console.error("Resend Email Error:", err);
        return { success: false, error: "Error An unexpected error occurred while sending the email." };
    }
}
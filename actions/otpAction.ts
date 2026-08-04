"use server";
import 'dotenv/config'
import Redis from "ioredis";
import crypto from "crypto";

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:2322');

export async function saveOTP(otp:string , phoneNumber:string){

    console.log("start save otp...")
    const otpKey = `otp:${phoneNumber}`;
    const cooldownKey = `cooldown:${phoneNumber}`;

    await checkSpam();

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    console.log("hashedotp:" + hashedOtp);
    const otpData = JSON.stringify({
        hash: hashedOtp,
        attempts: 0
    });

    const expiryTime = Number(process.env.OTP_EXPIRY_TIME) || 120;
    const cooldownTime = Number(process.env.RESEND_COOLDOWN) || 60;

    console.log("otpData:", otpData);
    await redis.setex(otpKey,expiryTime, otpData);

    console.log("1")

    await redis.setex(cooldownKey,cooldownTime, 'true');

    console.log("save to redis completed")
    return {
        success: true,
        message: 'The code was successfully generated and saved.',
        otp: otp
    };

}

async function checkSpam(){
    console.log("checking spam...")
    const isCooldownActive = await redis.exists(process.env.RESEND_COOLDOWN!);
    if (isCooldownActive) {
        const remainingTime = await redis.ttl(process.env.RESEND_COOLDOWN!);
        return {
            success: false,
            message:`Please wait ${remainingTime} seconds and then submit the request again.`
        };
    }
    console.log("checking spam end")
}

export async function generateOTP(min:number , max:number): Promise<string> {
    return crypto.randomInt(min, max).toString();
}

export async function verifyOTP(otp : string , phoneNumber : string){

    try {
        const hashedOTP = await redis.getex(`otp:${phoneNumber}`)
        const inputHashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
        return inputHashedOTP === hashedOTP;
    }
    catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        return {success : false , message : errorMessage}
    }

}

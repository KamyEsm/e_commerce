"use server";

import {saveOTP} from "@/actions/otpAction";
import Kavenegar from "kavenegar";

// sms sender

export async function sendSMS( message:string , receptor:string, debug:boolean = true , otp:boolean=false ){
    console.log("send sms...")
    if(debug) {
        console.log("message:" + message)
        console.log("receptor:" + receptor)
        if (otp) await saveOTP(message,receptor);
    }
    else {
        if (otp) {
            console.log("otp")
            const saveOTPRes = await saveOTP(message, receptor)
            if(!saveOTPRes.success) return {success : saveOTPRes , message : saveOTPRes.message}
        }

        //30393931584376524B4F547A47583763435234555876587374734933637A53396A6C4341314866456774513D
        try {
            console.log(process.env.KAVENEGAR_API_KEY)
            const api = Kavenegar.KavenegarApi({
                apikey: process.env.KAVENEGAR_API_KEY!,
            });
            api.Send({
                    message,
                    sender:process.env.SMS_SENDER || "2000660110",
                    receptor
                },
                function(response, status) {
                    console.log(response);
                    console.log(status);
                });
            console.log("send sms end")
        }

        catch (e){
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            return { success: false, message: errorMessage };
        }

    }

}


/*
sample output
{
    "return":
    {
        "status":200,
        "message":"تایید شد"
    },
    "entries":
    [
        {
            "messageid":8792343,
            "message":"خدمات پیام کوتاه کاوه نگار",
            "status":1,
            "statustext":"در صف ارسال",
            "sender":"10004346",
            "receptor":"09123456789",
            "date":1356619709,
            "cost":120
        },
        {
            "messageid":8792344,
            "message":"خدمات پیام کوتاه کاوه نگار",
            "status":1,
            "statustext":"در صف ارسال",
            "sender":"10004346",
            "receptor":"09367891011",
            "date":1356619709,
            "cost":120
        }
    ]
}
*/
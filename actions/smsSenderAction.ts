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
            if(!saveOTPRes.success) return {success : saveOTPRes , error : saveOTPRes.message}
        }


        try {
            const api = Kavenegar.KavenegarApi({
                apikey: process.env.KAVENEGAR_API_KEY!,
            });
            console.log(message)

            // api.Send({
            //         message,
            //         sender:process.env.SMS_SENDER || "2000660110",
            //         receptor
            //     },
            //     function(response, status) {
            //         console.log(response);
            //         console.log(status);
            //     });
            return {success : true , message : "sms sent"}
        }

        catch (e){
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            return { success: false, error: errorMessage };
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
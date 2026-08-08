"use client";

import {  InputOTP , InputOTPSlot , InputOTPGroup } from "@/components/ui/input-otp"
import {useState, useTransition} from "react";
import {useSearchParams} from "next/dist/client/components/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const contact = searchParams.get("contact");
    const [otp,setOTP] = useState("")
    const [isPending, startTransition] = useTransition();

    return(
        <div>
            <InputOTP maxLength={6} value={otp} onChange={(v) => (setOTP(v))} onComplete={}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    )
}
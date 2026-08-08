
import {  InputOTP , InputOTPSlot , InputOTPGroup } from "@/components/ui/input-otp"

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ contact?: string }>
}) {
    const { contact } = await searchParams;

    return(
        <InputOTP maxLength={6} defaultValue="123456">
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    )
}
"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { FaGoogle } from "react-icons/fa";


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import {signUpFormSchema} from "@/lib/validation/auth";
import {useTransition} from "react";
import signUpAction from "@/actions/authAction"
import {sendSMS} from "@/actions/smsSenderAction"
import {generateOTP} from "@/actions/otpAction"
import {useRouter} from "next/router";


export default function SignUp() {
    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            contact: "",
            password: ""
        },
    })

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function onSubmit(data: z.infer<typeof signUpFormSchema>) {

        startTransition(async () => {

            const res = await signUpAction(data);
            if (res.success) {
                toast.success(res.message)
                const phonenumber = res.data!.phonenumber
                await sendSMS(await generateOTP(100000 , 999999), phonenumber! , false , true)
                const contactParam = encodeURIComponent(data.contact);
                await router.push(`/verify?contact=${contactParam}`);
                // مثلاً هدایت کاربر به صفحه لاگین یا داشبورد
            } else {
                toast.error(res.error)
            }
        })

        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        })
    }

    return (
        <Card className="w-full sm:max-w-md ring-0">
            <CardHeader className="border-none">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your details below
                </CardDescription>
            </CardHeader>
            <CardContent className="border-none">
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    {/*<FieldLabel htmlFor="form-rhf-demo-title">*/}
                                    {/*    Name*/}
                                    {/*</FieldLabel>*/}
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Name"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="contact"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    {/*<FieldLabel htmlFor="form-rhf-demo-title">*/}
                                    {/*    Name*/}
                                    {/*</FieldLabel>*/}
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Email or Phon Number"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    {/*<FieldLabel htmlFor="form-rhf-demo-title">*/}
                                    {/*    Name*/}
                                    {/*</FieldLabel>*/}
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Password"
                                        autoComplete="off"
                                        type="password"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="border-none flex flex-col gap-2 justify-center">
                <Field orientation="vertical">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        <FaGoogle/> Sign Up With Google
                    </Button>
                    <Button type="submit" form="form-rhf-demo" className="bg-[#DB4444]">
                        Create Account
                    </Button>
                </Field>
                <Field orientation="vertical" className="flex flex-row">
                    <div>Already have account?</div>
                    <Link className="font-bold" href={"/log-in"}>Log in</Link>
                </Field>
            </CardFooter>
        </Card>
    )
}

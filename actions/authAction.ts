"use server";

import { prisma } from "@/lib/db";
import z from "zod";
import {signUpFormSchema} from "@/lib/validation/auth"
import zxcvbn from "zxcvbn";
import bcrypt from "bcryptjs";
import {createSession} from "@/lib/session"

export async function signUpAction(memberData: z.infer<typeof signUpFormSchema> ){

    const globalValidationRes = await signUpFormSchema.safeParseAsync(memberData);
    if(!globalValidationRes.success){
        return {success:false , error : globalValidationRes.error.message};
    }

    const { name, password, contact } = globalValidationRes.data;

    const isPhone = !contact.includes('@');

    try {
        const dbres = await prisma.member.findFirst({
            where: isPhone ? {phonenumber : contact} : {email : contact}
        })
        if(dbres){
            return {success : false , error : "this contact is already exist"}
        }

        const passwordSecureRes = zxcvbn(password).score
        if(passwordSecureRes < 3)
            return {success : false , error : "password is not secure"}

        const hashedPass = await bcrypt.hash(password , 10)

        const userRole = await prisma.role.findFirst({
            where:{name:"user"}
        })

        const dbresmember = await prisma.member.create({
            data:{
                name,
                ...(isPhone ? {phonenumber:contact } : {email:contact}),
                hashedPass,
                roles:{
                    create:{
                        role:{
                            connect:{
                                id:userRole!.id
                            }
                        }
                    }
                }
            }
        })

        await createSession(dbresmember.id)

        return {success : true , message : "Registration was successful." , data : dbresmember}
    }
    catch (e){
        const errorM = e instanceof Error ? e.message : "An unknown error occurred";
        return { success : false , error : errorM }
    }
}


import { deleteSession } from '@/lib/session'
import { redirect } from "next/navigation";

export async function logout(userid : number) {
    await deleteSession(userid)
    redirect('/login')
}


export async function login(){

}

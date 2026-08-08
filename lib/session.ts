import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/lib/validation/auth'
import Redis from "ioredis"
import 'dotenv/config'
import {cookies} from "next/headers";


const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:2322');

const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
    throw new Error("SESSION_SECRET is not defined in environment variables")
}
const encodedKey = new TextEncoder().encode(secretKey)


export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        const messageError = error instanceof Error ? error.message : "An unknown error occurred"
        console.error(messageError)
    }
}



export async function createSession(userId: number) {
    const expire = Number(process.env.SESSION_EXPIRY_TIME_S || 604800)
    const expireAt =  new Date(Date.now() + (expire * 1000))

    const session = await encrypt({userId , role:"user" ,expiresAt : expireAt})

    const redisKey = `session:userid:${userId}`

    await redis.setex(redisKey , expire , session)

    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expireAt,
        sameSite: 'lax',
        path: '/',
    })
}


export async function deleteSession(userId : number) {
    await redis.del(`session:userid:${userId}`)

    const cookieStore = await cookies()
    cookieStore.delete('session')
}
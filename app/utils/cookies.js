// import {createCookieSessionStorage} from "@remix-run/react"
import { createCookieSessionStorage } from "@remix-run/node";

const MAX_AGE = 60 * 60 * 12 // 12 HOURS

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: 'sb:token',
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        domain: '',
        path: "/",
        sameSite: "lax",
        httpOnly: true,
        secure: true,
        secrets: ['selling this is cool']
    }
})

export { getSession, commitSession, destroySession };
import { defineMiddleware } from "astro/middleware";
import { getSession} from 'auth-astro/server';
 
export const onRequest = defineMiddleware(async(context, next)=> {
    let session = await getSession(context.request);
    
    // remove authentication during pagefind build so that pagefind can successfully build indexes
    if (process.env.SKIP_AUTH) {
        return next()
    }
    console.log("search params", context.url.searchParams.toString())

    if (!session && !context.url.pathname.startsWith("/api/auth") && !context.url.pathname.startsWith("/auth") ){
        return Response.redirect(new URL(`/auth/signin?callbackUrl=${context.url.pathname}`, context.url), 302)
    }

    return next ()

})
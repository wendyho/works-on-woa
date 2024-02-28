import { defineMiddleware } from "astro/middleware";
import { getSession } from 'auth-astro/server';

 
export const onRequest = defineMiddleware(async(context, next)=> {
    let session = await getSession(context.request);
    console.log(session);
    
    
    if (!session && !context.url.pathname.startsWith("/api/auth")  ){
        return Response.redirect(new URL("/api/auth/signin", context.url), 302)
    }

    return next ()

   

})



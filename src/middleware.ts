import { defineMiddleware } from "astro:middleware";
import  get_user_session  from "./lib/auth";


export const onRequest =  defineMiddleware(async (context, next) => {
  const url = context.url;
  const url_path = context.url.pathname.split('/')[1];
  if(url_path == "signin" || url_path == "404") return next();
  
  context.locals.url_path = context.url.pathname;
  if (url_path === 'project') {
    const user = await get_user_session(context.cookies);
    if(!user) {
      return Response.redirect(new URL("/signin", context.url));
    }
    context.locals.user = user;
  }
  
  return next();
});
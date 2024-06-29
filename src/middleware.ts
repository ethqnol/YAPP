import { defineMiddleware } from "astro:middleware";
import { get_user_session } from "./firebase/server";}


export const onRequest =  defineMiddleware(async (context, next) => {
  const url_base = context.url.pathname.split('/')[1];
  if (url_base === 'project') {
    const user = await get_user_session(context.cookies);
    if(!user) {
      return Response.redirect('/signin');
    }
    context.locals.user = user;
  }
  
  return next();
});
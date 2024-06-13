import type { APIRoute } from "astro";
import { app, get_user_session } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import type DatabaseNotecard from "../../../lib/notecard_database.ts";
import Fuse from "fuse.js";

export const GET : APIRoute = async ({ params, cookies }) => {
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response( "Not permitted",  { status: 403 });
  }
  

  
  // const fuse_options={
  //   keys: [
  //     "quote",
  //     "analysis",
  //     "title"
  //   ]
  // }
  
  // let search_query : string = params.search ? params.search : "";
  // if(search_query == "") return new Response(JSON.stringify(user_notecards), { status: 200 });
  // const fuse = new Fuse(user_notecards, fuse_options);
  // console.log(search_query);
  // const results = fuse.search(search_query)
  
  return new Response(JSON.stringify(user_notecards), { status: 200 });

}
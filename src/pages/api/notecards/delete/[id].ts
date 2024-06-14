
import type { APIRoute } from "astro";
import { app, get_user_session } from "../../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import type Notecard from "../../../../lib/notecard.ts";


export const POST: APIRoute = async ({ params, cookies }) => {
  let notecard_id: string = params.id;
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  
  if (!notecard_id) {
    return new Response("Cannot find notecard", {
      status: 404,
    });
  }
  
  try {
    const db = getFirestore(app);
    await db.collection("Notecards").doc(notecard_id).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




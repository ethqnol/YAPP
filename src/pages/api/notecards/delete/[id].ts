
import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import get_user_session from "../../../../lib/auth.ts";
import { getFirestore } from "firebase-admin/firestore";



export const DELETE: APIRoute = async ({ params, cookies }) => {
  let notecard_id: string | undefined = params.id;
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
    return new Response("Error while deleting notecard", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




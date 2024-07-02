
import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import get_user_session from "../../../../lib/auth.ts";
import { getFirestore } from "firebase-admin/firestore";
import type Notecard from "../../../../lib/notecard.ts";


export const POST: APIRoute = async ({ params, request, cookies }) => {
  let notecard: Notecard = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  if (!notecard || !notecard.quote) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  notecard.student_id = user.uid;

  if (!params.id) {
    return new Response("Cannot find notecard", {
      status: 404,
    });
  }

  try {
    const db = getFirestore(app);
    await db.collection("Notecards").doc(params.id).update({
      ...notecard,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




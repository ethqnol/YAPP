import type { APIRoute } from "astro";
import { app, get_user_session } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import type Notecard from "../../../lib/notecard.ts";


export const POST: APIRoute = async ({ request, cookies }) => {
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

  try {
    const db = getFirestore(app);
    const notecards_ref = db.collection("Notecards");
    await notecards_ref.add({
      ...notecard,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




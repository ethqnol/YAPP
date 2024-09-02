import type { APIRoute } from "astro";
import { app } from "../../../firebase/client";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../lib/auth.ts";
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
    const notecards_ref = addDoc(collection(db, "Notecards"), {...notecard});
  } catch (error) {
    return new Response("Error while adding notecard", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




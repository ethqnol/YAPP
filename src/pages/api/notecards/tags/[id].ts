import type { APIRoute } from "astro";
import { app } from "../../../../firebase/client";
import { getDoc, doc, where, getDocs, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../../lib/auth.ts";
import type Tag from "../../../../lib/tags.ts";
import type Notecard from "../../../../lib/notecard.ts";


export const POST: APIRoute = async ({ request, params, cookies }) => {
  let tags: Tag[] = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  if (!tags) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  let notecard_id: string | undefined = params.id;

  if (!notecard_id) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  try {
    const db = getFirestore(app);
    const notecards_ref = doc(db, "Notecards", notecard_id);
    getDoc(notecards_ref).then((doc) => {
      if ((doc.data() as Notecard).student_id == user.uid) {
        updateDoc(notecards_ref, { tags: tags })
      } else {
        return new Response("Not authorized to perform this action", {
          status: 403,
        });
      }
    });
  } catch (error) {
    return new Response("Error while updating tags", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




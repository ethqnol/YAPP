
import type { APIRoute } from "astro";
import { app } from "../../../../firebase/client";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../../lib/auth.ts";
import type Notecard from "../../../../lib/notecard.ts";



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
    let notecard_ref = doc(db, "Notecards", notecard_id);
    getDoc(notecard_ref).then((doc) => {
      if ((doc.data() as Notecard).student_id == user.uid) {
        deleteDoc(notecard_ref)
      } else {
        return new Response("Not authorized to perform this action", {
          status: 403,
        })
      }
    });
  } catch (error) {
    return new Response("Error while deleting notecard", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




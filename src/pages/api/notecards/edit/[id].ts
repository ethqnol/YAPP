
import type { APIRoute } from "astro";
import get_user_session from "../../../../lib/auth.ts";
import { app } from "../../../../firebase/client";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import type Notecard from "../../../../lib/notecard.ts";


export const POST: APIRoute = async ({ params, request, cookies }) => {
  let notecard: Notecard = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  
  
  if (!notecard || !notecard.quote || !notecard.source_id ||!notecard.title) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  
  if(typeof notecard.quote != "string") return new Response("Missing required fields", { status: 400});
  if(typeof notecard.source_id != "string") return new Response("Missing required fields", { status: 400});
  if(typeof notecard.analysis != "string") return new Response("Missing required fields", { status: 400});
  if(typeof notecard.title != "string") return new Response("Missing required fields", { status: 400});
  if(typeof notecard.start_page != "number") return new Response("Missing required fields", { status: 400});
  if(typeof notecard.end_page != "number") return new Response("Missing required fields", { status: 400});
  if(!Array.isArray(notecard.tags)) return new Response("Missing required fields", { status: 400});
  
  notecard.student_id = user.uid;
  if (!params.id) {
    return new Response("Cannot find notecard", {
      status: 404,
    });
  }

  try {
    const db = getFirestore(app);
    let notecard_ref = doc(db, "Notecards", params.id);
    getDoc(notecard_ref).then((doc) => {
      if ((doc.data() as Notecard).student_id == user.uid) {
        updateDoc(notecard_ref, { ...notecard });
      } else {
        return new Response("Not authorized to perform this action", {
          status: 403,
        });
      }
    });
  } catch (error) {
    return new Response("Error while editing notecard", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




import type { APIRoute } from "astro";
import { app } from "../../../../firebase/client";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import type Source from "../../../../lib/source.ts";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../../lib/auth.ts";


export const DELETE: APIRoute = async ({ params, cookies }) => {
  let source_id = params.id;

  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!source_id || source_id.length == 0) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  try {
    const db = getFirestore(app);
    const sources_ref = doc(db, "Sources", source_id);
    getDoc(sources_ref).then((doc) => {
      if ((doc.data() as Source).student_id == user.uid) {
        deleteDoc(sources_ref);
      } else {
        return new Response("Not authorized to perform this action", {
          status: 403,
        });
      }
    });

  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return new Response("Error while deleting source", {
      status: 500,
    });
  }

  return new Response("Source deleted successfully!", { status: 200 });
}
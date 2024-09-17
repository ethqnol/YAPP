import type { APIRoute } from "astro";
import { app } from "../../../../firebase/client";
import { doc, getDoc, deleteDoc, writeBatch, collection, getDocs, query, where } from "firebase/firestore";
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
    let batch = writeBatch(db);
    const sources_ref = doc(db, "Sources", source_id);
    const notecards_ref = getDocs(query(collection(db, "Notecards"), where("source_id", "==", source_id)))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
      });
    getDoc(sources_ref).then((doc) => {
      if ((doc.data() as Source).student_id == user.uid) {
        batch.delete(sources_ref);
        batch.commit();
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
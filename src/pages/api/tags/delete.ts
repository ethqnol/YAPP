import type { APIRoute } from "astro";
import { app } from "../../../firebase/client";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../lib/auth.ts";
import type Tag from "../../../lib/tags.ts";

export const DELETE: APIRoute = async ({ request, cookies }) => {
  let tag_ids: string[] = await request.json();

  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!tag_ids || tag_ids.length == 0) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  try {
    const db = getFirestore(app);
    const doc_ref = doc(db, "Tags", user.uid);
    getDoc(doc(db, "Tags", user.uid)).then((doc) => {
      if (!doc.exists()) {
        return new Response("tag not found", { status: 404 });
      } else if (doc.id == user.uid) {
        let current_tags_snapshot = doc;
        let current_tags: Tag[] = current_tags_snapshot.data()!.tags;

        let new_tags = current_tags.filter(tag => !tag_ids.includes(tag.tag_id));

        updateDoc(doc_ref, {
          tags: new_tags,
        });
      }
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return new Response("Error while deleting tags", {
      status: 500,
    });
  }

  return new Response("tag deleted successfully", { status: 200 });
}
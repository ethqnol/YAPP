import type { APIRoute } from "astro";
import { app, get_user_session } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
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
    const tags_ref = db.collection("Tags");
    const current_tags_snapshot = await tags_ref.doc(user.uid).get();

    if (!current_tags_snapshot.exists) {
      return new Response("tag not found", { status: 404 })
    }

    let current_tags: Tag[] = current_tags_snapshot.data()!.tags;

    let new_tags = current_tags.filter(tag => !tag_ids.includes(tag.tag_id));
    await tags_ref.doc(user.uid).update({
      tags: new_tags,
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return new Response("tag deleted successfully", { status: 200 });
}
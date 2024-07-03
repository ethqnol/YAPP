import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import get_user_session from "../../../lib/auth.ts";
import { getFirestore } from "firebase-admin/firestore";
import type Tag from "../../../lib/tags.ts";
import Hashids from 'hashids'

export const POST: APIRoute = async ({ request, cookies }) => {
  let user_tag: Tag = await request.json();

  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  if (!user_tag.name || user_tag.name.length == 0) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  if (user_tag.name.length > 20) {
    return new Response("Tag name too long", {
      status: 400,
    });
  }

  user_tag.tag_id = new Hashids().encode(Date.now());

  try {
    const db = getFirestore(app);
    const tags_ref = db.collection("Tags");
    const current_tags_snapshot = await tags_ref.doc(user.uid).get();
    if (!current_tags_snapshot.exists) {
      tags_ref.doc(user.uid).set({ tags: [user_tag] });
      return new Response("tag added successfully", { status: 200 })
    }

    let current_tags: Tag[] = current_tags_snapshot.data()!.tags;
    current_tags.push(user_tag)
    await tags_ref.doc(user.uid).update({
      tags: current_tags,
    });
  } catch (error) {
    return new Response("Error while adding tag", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




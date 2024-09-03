import type { APIRoute } from "astro";
import get_user_session from "../../../lib/auth.ts";
import { app } from "../../../firebase/client";
import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import type Tag from "../../../lib/tags.ts";
import Hashids from 'hashids'
import { updateDoc } from "firebase/firestore";

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
    const tags_ref = doc(db, "Tags", user.uid);
    getDoc(tags_ref).then((doc) => {
      if (!doc.exists) {
        setDoc(tags_ref, { tags: [user_tag] });
        return new Response("tag added successfully", { status: 200 })
      } else {
        let current_tags_snapshot = doc;
        let current_tags: Tag[] = current_tags_snapshot.data()!.tags;
        current_tags.push(user_tag)
        updateDoc(tags_ref, {
          tags: current_tags,
        });
      }
    });
  } catch (error) {
    return new Response("Error while adding tag", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




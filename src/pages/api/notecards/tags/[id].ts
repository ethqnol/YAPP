import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import get_user_session from "../../../../lib/auth.ts";
import { getFirestore } from "firebase-admin/firestore";
import type Tag from "../../../../lib/tags.ts";


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
    const notecards_ref = db.collection("Notecards");
    await notecards_ref.doc(notecard_id).update({
      tags: tags,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return new Response("notecard added successfully", { status: 200 });
};




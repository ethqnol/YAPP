import type { APIRoute } from "astro";
import { app  } from "../../../../firebase/server";
import get_user_session from "../../../../lib/auth.ts";
import { getFirestore } from "firebase-admin/firestore";

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
    const sources_ref = db.collection("Source");
    await sources_ref.doc(user.uid).delete();

  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return new Response("Error while deleting source", {
      status: 500,
    });
  }

  return new Response("Source deleted successfully!", { status: 200 });
}
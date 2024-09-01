import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import get_user_session from "../../../../lib/auth.ts";
import { getFirestore } from "firebase-admin/firestore";
import type Source from "../../../../lib/source.ts";

export const POST: APIRoute = async ({ params, request, cookies }) => {
  let source: Source = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  if (!source) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  source.student_id = user.uid;

  if (!params.id) {
    return new Response("Cannot find source", {
      status: 404,
    });
  }

  try {
    const db = getFirestore(app);
    await db.collection("sources").doc(params.id).update({
      ...source,
    });
  } catch (error) {
    return new Response("Error while editing source", {
      status: 500,
    });
  }

  return new Response("source added successfully", { status: 200 });
};
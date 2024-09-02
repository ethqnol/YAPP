import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import get_user_session from "../../../lib/auth";
import { getFirestore } from "firebase-admin/firestore";


export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const { allow_teacher_view, allow_public_streak_record, allow_public_progress_view, allow_public_awards_record } = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (allow_teacher_view == undefined || !allow_public_streak_record == undefined || !allow_public_progress_view == undefined || !allow_public_awards_record == undefined) {
    return new Response("Missing Required Fields", {
      status: 400,
    });
  }
  const db = getFirestore(app);

  try {
    await db.collection("Students")
      .doc(user.uid)
      .update({
        allow_teacher_view: allow_teacher_view,
        allow_public_streak_record: allow_public_streak_record,
        allow_public_progress_view: allow_public_progress_view,
        allow_public_awards_record: allow_public_awards_record
      })
  } catch (error) {
    return new Response("Error while adding task", {
      status: 500,
    });
  }

  return redirect("/project/todo")
};




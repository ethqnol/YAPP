import type { APIRoute } from "astro";
import { app } from "../../../firebase/client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../lib/auth";


export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const { allow_teacher_view, allow_public_streak_record, allow_public_progress_view, allow_public_awards_record } = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (allow_teacher_view == undefined || allow_public_streak_record == undefined || allow_public_progress_view == undefined || allow_public_awards_record == undefined) {
    return new Response("Missing Required Fields", {
      status: 400,
    });
  }
  
  if(typeof allow_teacher_view !== "boolean" || typeof allow_public_streak_record !== "boolean" || typeof allow_public_progress_view !== "boolean" || typeof allow_public_awards_record !== "boolean") {
    return new Response("Invalid data", {
      status: 400,
    });
  }
    
  const db = getFirestore(app);

  try {
    let student_ref = doc(db, "Students", user.uid);
    getDoc(student_ref).then((doc) => {
      if (doc.id == user.uid) {
        updateDoc(student_ref, {
          allow_teacher_view: allow_teacher_view,
          allow_public_streak_record: allow_public_streak_record,
          allow_public_progress_view: allow_public_progress_view,
          allow_public_awards_record: allow_public_awards_record
        })
      } else {
        return new Response("Not authorized to perform this action", {
          status: 403,
        });
      }
    })
  } catch (error) {
    return new Response("Error while adding task", {
      status: 500,
    });
  }

  return redirect("/project/todo")
};




import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import get_user_session from "../../../../lib/auth";
import { getFirestore } from "firebase-admin/firestore";
import type Task from "../../../../lib/task";


export const GET: APIRoute = async ({ params, cookies, redirect }) => {
  const syllabus_id: string | undefined = params.id;
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!syllabus_id) {
    return new Response("Missing Required Fields", {
      status: 400,
    });
  }
  const db = getFirestore(app);
  let batch = db.batch();
  try {
    const todo_ref = db.collection("Tasks")
    await todo_ref.where("syllabus_id", "==", syllabus_id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    });
    
    batch.delete(db.collection("Syllabus").doc(syllabus_id));
    await batch.commit();
  } catch (error) {
    return new Response("Error while adding task", {
      status: 500,
    });
  }

  return redirect("/classroom")
};




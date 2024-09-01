import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import get_user_session from "../../../../lib/auth";
import { getFirestore } from "firebase-admin/firestore";
import firebase from "firebase-admin";

export const GET: APIRoute = async ({ params, cookies, redirect }) => {
  const tasks_id: string | undefined = params.id;
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!tasks_id) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  
  try {
    const db = getFirestore(app);
    await db.collection("Tasks").doc(tasks_id).get().then((doc) => {
      if (!doc.exists) {
        return new Response("Task not found", {
          status: 404,
        })
      } else {
        if(doc.data()!.syllabus_id != ""){
          db.collection("Syllabus").doc(doc.data()!.syllabus_id).update({
            completed_num: firebase.firestore.FieldValue.increment(-1)
          });
        }
        doc.ref.update({completed: false}); 
      }
    });
  } catch (error) {
    return new Response("Error while uncompleting task", {
      status: 500,
    });
  }

  return redirect("/project/todo")
};




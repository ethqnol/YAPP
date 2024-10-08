import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import get_user_session from "../../../../lib/auth";
import { getFirestore } from "firebase-admin/firestore";


export const GET: APIRoute = async ({ cookies, redirect }) => {
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }  
  try {
    const db = getFirestore(app);
    const tasks_ref = db.collection("Tasks");
    await tasks_ref.where("completed", "==", true).get().then((query_snapshot) => {
      query_snapshot.forEach((doc) => {
        tasks_ref.doc(doc.id).delete();
      });
    });

  } catch (error) {
    return new Response("Error while completing task", {
      status: 500,
    });
  }

  return redirect("/project/todo")
};




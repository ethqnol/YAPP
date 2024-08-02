import type { APIRoute } from "astro";
import { app } from "../../../../firebase/server";
import get_user_session from "../../../../lib/auth";
import { getFirestore } from "firebase-admin/firestore";


export const GET: APIRoute = async ({ params, cookies, redirect }) => {
  const tasks_id: string | undefined = params.id;
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!tasks_id) {
    return new Response("Missing required fields", {
      status: 404,
    });
  }

  
  try {
    const db = getFirestore(app);
    const tasks_ref = db.collection("Tasks");
    await tasks_ref.doc(tasks_id).delete();
  } catch (error) {
    return new Response("Error while completing task", {
      status: 500,
    });
  }

  return redirect("/project/todo")
};




import type { APIRoute } from "astro";
import { app, get_user_session } from "../../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";


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
    const tasks_ref = db.collection("Tasks");
    await tasks_ref.doc(tasks_id).update({
      completed : false,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return redirect("/project/todo")
};




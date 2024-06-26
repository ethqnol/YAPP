import type { APIRoute } from "astro";
import { app, get_user_session } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import type Task from "../../../lib/task";


export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form_data: FormData = await request.formData();
  const name = form_data.get("name")?.toString();
  const description = form_data.get("description")?.toString();
  const due_date = form_data.get("due_date")?.toString();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!name || !description) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  
  const task : Task = { student_id: user.uid, 
                        name, 
                        description,
                        due_date: due_date ? new Date(due_date).getTime() : null,
                        creation_date: new Date().getTime(),
                        completed: false
                      }
  
  try {
    const db = getFirestore(app);
    const tasks_ref = db.collection("Tasks");
    await tasks_ref.add({
      ...task,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }

  return redirect("/project/todo")
};




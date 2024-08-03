import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import get_user_session from "../../../lib/auth";
import { getFirestore } from "firebase-admin/firestore";
import type Task from "../../../lib/task";


export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const task : Task = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!task.name || !task.description) {
    return new Response("Missing Required Fields", {
      status: 400,
    });
  }
  
  let date = task.due_date ? (new Date(task.due_date) ? new Date(task.due_date).getTime() : null) : null;
  const final_task: Task = {
    student_id: user.uid,
    name: task.name,
    description: task.description,
    due_date: date,
    creation_date: new Date().getTime(),
    completed: false
  }

  try {
    const db = getFirestore(app);
    const tasks_ref = db.collection("Tasks");
    await tasks_ref.add({
      ...final_task,
    });
  } catch (error) {
    return new Response("Error while adding task", {
      status: 500,
    });
  }

  return redirect("/project/todo")
};




import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import get_user_session from "../../../lib/auth";
import { getFirestore } from "firebase-admin/firestore";
import type Task from "../../../lib/task";


export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const { task, class_id } = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }

  if (!task.name || !task.description) {
    return new Response("Missing Required Fields", {
      status: 400,
    });
  }
  const db = getFirestore(app);
  let batch = db.batch();

  try {
    const todo_ref = db.collection("Tasks")
    const syllabus_ref = db.collection("Syllabus")
    const syllabus_todo_doc = syllabus_ref.doc()
    batch.set(syllabus_todo_doc, {
      name: task.name,
      description: task.description,
      due_date: task.due_date,
      creation_date: new Date().getTime(),
      completed: false,
      class_id: class_id,
      completed_num: 0,
      user_id: user.uid
    });
    await db.collection("Students")
      .where("class_id", "==", class_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          batch.set(todo_ref.doc(), {
            student_id: doc.id,
            name: task.name,
            description: task.description,
            due_date: task.due_date,
            creation_date: new Date().getTime(),
            completed: false,
            syllabus_id: syllabus_todo_doc.id,
          })
        });
      })
    await batch.commit();
  } catch (error) {
    return new Response("Error while adding task", {
      status: 500,
    });
  }

  return redirect("/project/todo")
};




import type { APIRoute } from "astro";
import { app } from "../../../firebase/client";
import { writeBatch, collection, query, where, getDocs, addDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../lib/auth";




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
  let batch = writeBatch(db);

  try {
    const todo_ref = collection(db, "Tasks")
    const syllabus_ref = collection(db, "Syllabus")
    const syllabus_todo_doc = doc(syllabus_ref)
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
    await getDocs(query(collection(db, "Students"), where("class_id", "==", class_id)))
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          batch.set(doc(todo_ref), {
            student_id: document.id,
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




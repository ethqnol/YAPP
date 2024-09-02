import type { APIRoute } from "astro";
import { app } from "../../../../firebase/client";
import { writeBatch, query, where, getDocs, collection, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../../lib/auth";



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
  let batch = writeBatch(db);
  try {
    const todo_ref = collection(db, "Tasks")
    await getDocs(query(todo_ref, where("syllabus_id", "==", syllabus_id)))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
      });

    batch.delete(doc(db, "Syllabus", syllabus_id));
    await batch.commit();
  } catch (error) {
    return new Response("Error while adding task", {
      status: 500,
    });
  }

  return redirect("/classroom")
};




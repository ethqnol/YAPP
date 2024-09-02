import type { APIRoute } from "astro";
import { app } from "../../../firebase/client";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import get_user_session from "../../../lib/auth.ts";

export const POST: APIRoute = async ({ request, cookies }) => {
  let class_code = await request.json();
  const user = await get_user_session(cookies);
  if (!user) {
    return new Response("Unauthorized", { status: 403 });
  }
  if (!class_code) {
    return new Response("Missing Class Code", {
      status: 400,
    });
  }

  try {
    const db = getFirestore(app);
    getDocs(query(collection(db, "Class"), where("class_code", "==", class_code.class_code)))
      .then((query_snapshot) => {
        if (query_snapshot.empty) {
          return new Response("Class Code Invalid", {
            status: 400,
          })
        } else {
          let document = query_snapshot.docs[0];
          let id = document.id;
          let teacher_id = document.data()!.teacher_id;
          let user_doc = doc(db, "Students", user.uid)
          updateDoc(user_doc, {
            class_id: id,
            teacher_id: teacher_id,
          })
        }
      })
  } catch (error) {
    return new Response("Error while adding class", {
      status: 500,
    });
  }

  return new Response("class added successfully", { status: 200 });
};




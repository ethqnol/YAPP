import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import get_user_session from "../../../lib/auth.ts";
import { getFirestore } from "firebase-admin/firestore";

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
    db.collection("Class")
      .where("class_code", "==", class_code.class_code)
      .get()
      .then((query_snapshot) => {
        if (query_snapshot.empty) {
          return new Response("Class Code Invalid", {
            status: 400,
          })
        } else {
          let query = query_snapshot.docs[0].ref.get().then(doc => {
            let id = doc.id;
            let teacher_id = doc.data()!.teacher_id;
            db.collection("Students")
              .doc(user.uid)
              .update({
                class_id: id,
                teacher_id: teacher_id,
              })
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



